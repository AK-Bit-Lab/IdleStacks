const fs = require('fs');
const { STACKS_MAINNET } = require('@stacks/network');
const { makeSTXTokenTransfer, broadcastTransaction } = require('@stacks/transactions');
const { fetchWithRetry, monitorTransaction, delay, shuffleArray, getWalletBalance, getWalletNonce } = require('./utils');

const network = { ...STACKS_MAINNET, url: "https://api.mainnet.hiro.so" };
const WALLETS_FILE = './scripts/automation/wallets.json';
const TXS_PER_WALLET = 10;
const MIN_FEE = 4500;
const MAX_FEE = 10000;

const getRandomFee = () => Math.floor(Math.random() * (MAX_FEE - MIN_FEE + 1)) + MIN_FEE;

async function main() {
    if (!fs.existsSync(WALLETS_FILE)) return console.log("❌ Wallets not found. Run generate.js first.");
    const wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf8'));
    
    // Check for specific wallet argument e.g., --wallet-76
    const walletArg = process.argv.find(arg => arg.startsWith('--wallet-'));
    let funderIdx = -1;
    
    if (walletArg) {
        const specifiedId = parseInt(walletArg.split('--wallet-')[1], 10);
        funderIdx = wallets.findIndex(w => w.id === specifiedId);
        if (funderIdx === -1) {
            console.log(`⚠️ Wallet ID #${specifiedId} not found, falling back to random wallet.`);
        }
    }
    
    // If no argument provided or wallet not found, pick randomly
    if (funderIdx === -1) {
        funderIdx = Math.floor(Math.random() * wallets.length);
    }
    
    const funder = wallets[funderIdx];
    
    // Remaining 106 wallets are the receiver targets
    let receivers = wallets.filter((_, idx) => idx !== funderIdx);
    
    // Check which ones already have enough STX
    const averageWalletNeeds = TXS_PER_WALLET * MAX_FEE; 
    const amountSTX = averageWalletNeeds;
    let fundedReceivers = [];
    let unfundedReceivers = [];

    console.log(`Checking existing balances of ${receivers.length} wallets...`);
    for (let i = 0; i < receivers.length; i++) {
        const r = receivers[i];
        let bal = 0;
        try {
            bal = await getWalletBalance(r.stxAddress);
        } catch(e) {}
        
        if (bal >= amountSTX) {
            fundedReceivers.push(r);
        } else {
            unfundedReceivers.push({ wallet: r, bal, needs: amountSTX - bal });
        }
        
        process.stdout.write(`\rChecked ${i + 1}/${receivers.length} wallets...`);
        // Hiro API rate limit is usually 50 requests / 10 seconds.
        // Waiting 500ms between calls prevents hitting limits for 106 wallets.
        await delay(500);
        
        // Every 30 wallets, pause an extra 10 seconds to fully reset the API bucket
        if ((i + 1) % 30 === 0) {
            console.log(`\n⏳ Batch check pause: Sleeping 10s to respect API rate limits...`);
            await delay(10000);
        }
    }
    console.log(""); // Clear line

    // Randomize the order of receivers for organic distribution behaviour
    unfundedReceivers = shuffleArray([...unfundedReceivers]);
    
    const totalRequiredForInteractions = unfundedReceivers.reduce((acc, r) => acc + r.needs, 0);
    const distributionFees = unfundedReceivers.length * MAX_FEE; 
    const totalRequired = totalRequiredForInteractions + distributionFees;

    console.log(`--- Funding Check ---`);
    console.log(`Funder Address [Selected Wallet #${funder.id}]: ${funder.stxAddress}`);
    console.log(`Wallets already funded: ${fundedReceivers.length}`);
    console.log(`Total Wallets to Fund (Top-up): ${unfundedReceivers.length}`);
    
    if (unfundedReceivers.length === 0) {
        console.log(`✅ All wallets are already funded! Distribution skipped.`);
        return;
    }

    console.log(`Total STX required by Funder: ${(totalRequired / 1000000).toFixed(4)} STX\n`);
    
    let bal = 0;
    let nonce = 0;
    try {
        bal = await getWalletBalance(funder.stxAddress);
        nonce = await getWalletNonce(funder.stxAddress);
    } catch(e) {
        console.log(`⚠️ Network error fetching balance for ${funder.stxAddress}.`);
        console.log(e);
        // Script will just gracefully exit instead of crashing hard
        return false;
    }

    if (bal < totalRequired) {
        const diff = ((totalRequired - bal) / 1000000).toFixed(4);
        console.log(`❌ ERROR: Funder wallet has ${bal/1000000} STX.`);
        console.log(`❌ Requires ${diff} MORE STX to proceed.`);
        console.log(`=> Send STX to ${funder.stxAddress} and re-run with: node scripts/automation/distribute.js --wallet-${funder.id}\n`);
        return false;
    }
    console.log(`✅ Funder has adequate funds. Distribution can begin (Randomly Shuffled Order)...\n`);
    
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < unfundedReceivers.length; i++) {
        const receiver = unfundedReceivers[i];
        const fundAmount = receiver.needs;
        const fee = getRandomFee();
        
        console.log(`Tx #${i + 1} | Wallet #${receiver.wallet.id} - Topping up ${fundAmount} uSTX to ${receiver.wallet.stxAddress}...`);

        try {
            const txOptions = {
                recipient: receiver.wallet.stxAddress,
                amount: fundAmount,
                senderKey: funder.privateKey,
                network,
                fee,
                nonce,
                anchorMode: 3 // AnchorMode.OnChainOnly
            };
            
            const transaction = await makeSTXTokenTransfer(txOptions);
            const broadcastResponse = await broadcastWithRetry(transaction, network);

            if (broadcastResponse.error) {
                console.log(`❌ Failed to send to ${receiver.wallet.stxAddress}: ${broadcastResponse.error}`);
                failureCount++;
            } else {
                console.log(`⏳ Funding tx broadcasted for ${receiver.wallet.stxAddress} (${broadcastResponse.txid})`);
                const status = await monitorTransaction(broadcastResponse.txid);
                if (status.success) {
                    console.log(`✅ Successfully funded ${receiver.wallet.stxAddress}`);
                    successCount++;
                } else {
                    console.log(`❌ Funding failed for ${receiver.wallet.stxAddress}: ${status.reason}`);
                    failureCount++;
                }
                nonce++;
            }
        } catch (e) {
            console.log(`❌ Error sending to ${receiver.wallet.stxAddress}: ${e.message}`);
            failureCount++;
        }
        
        // Organic delay between sends
        const randomDelay = Math.floor(Math.random() * 2000) + 3000; // 3-5 secs
        console.log(`⏳ Waiting ${randomDelay/1000}s before next transaction...`);
        await delay(randomDelay);
        
        if ((i + 1) % 15 === 0) {
            console.log(`\n⏳ Batch threshold reached. Pausing 15 seconds to avoid rate limits...`);
            await delay(15000);
        }
    }
    
    console.log(`\n--- Distribution Summary ---`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
}

async function broadcastWithRetry(tx, network, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await broadcastTransaction({ transaction: tx, network });
            return response;
        } catch (error) {
            console.log(`\x1b[33m          ⚠️ Broadcast fault (${error.message}). Retrying in ${(i + 1) * 3000}ms. (${i + 1}/${maxRetries})\x1b[0m`);
            await delay((i + 1) * 3000);
        }
    }
    return { error: 'Maximum retries reached during broadcast.' };
}

main().catch(console.error);
