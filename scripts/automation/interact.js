const fs = require('fs');
const { STACKS_MAINNET } = require("@stacks/network");
const { makeContractCall, broadcastTransaction } = require('@stacks/transactions');
const { fetchWithRetry, monitorTransaction, delay, shuffleArray, getWalletNonce } = require('./utils');

const network = { ...STACKS_MAINNET, coreApiUrl: "https://api.mainnet.hiro.so" };

const WALLETS_FILE = './scripts/automation/wallets.json';

const CONTRACT_DEPLOYER = "SP2KK5E7D3NFTSDMSJ7SFK99YY68194E3J2H6TT96";
const CONTRACTS = ["clicker-v2m", "tipjar-v2m", "quickpoll-v2n"];
const TXS_PER_WALLET = 10;
const MIN_FEE = 4500;
const MAX_FEE = 10000;

const getRandomFee = () => Math.floor(Math.random() * (MAX_FEE - MIN_FEE + 1)) + MIN_FEE;
const getRandomContract = () => CONTRACTS[Math.floor(Math.random() * CONTRACTS.length)];

async function executeTxWithRetry(txOptions, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const transaction = await makeContractCall(txOptions);
            let txBytes;
            if (typeof transaction.serialize === "function") {
                txBytes = transaction.serialize();
            } else if (transaction.payload) {
                const { serializeTransaction } = require("@stacks/transactions");
                txBytes = serializeTransaction(transaction);
            } else {
                txBytes = Buffer.from("");
            }
            const broadcastResponse = await broadcastTransaction({ transaction, network });
            
            if (!broadcastResponse.error) {
                return { broadcasted: true, txid: broadcastResponse.txid };
            }
            
            if (broadcastResponse.error.toLowerCase().includes('toomuchdata') || broadcastResponse.error.toLowerCase().includes('badargument')) {
                // Return gracefully for payload issues
                return { broadcasted: false, error: broadcastResponse.error };
            }
            
            console.log(`\n⚠️ Network error, retrying (${attempt}/${maxRetries}): ${broadcastResponse.error}`);
        } catch (e) {
            console.log(`\n⚠️ Request failed, retrying (${attempt}/${maxRetries}): ${e.message}`);
        }
        await delay(5000 * attempt); 
    }
    return { broadcasted: false, error: 'Max network retries reached.' };
}

async function main() {
    if (!fs.existsSync(WALLETS_FILE)) return console.log("❌ Wallets not found.");
    let rawWallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf8'));
    
    console.log(`🚀 Starting Organic Interactions across 107 wallets...`);
    
    // Instead of doing 10 per wallet, we map the global load
    // so we hop wildly between wallets continuously until everyone finishes 10 transactions.
    
    // Track how many txs each wallet has done
    let interactionTracker = rawWallets.map(w => ({ ...w, count: 0, nonce: null }));
    
    // Total interactions we need = 1070
    let totalDone = 0;
    const targetTotal = interactionTracker.length * TXS_PER_WALLET;
    
    while(totalDone < targetTotal) {
        // Filter out wallets that already hit 10
        let availableWallets = interactionTracker.filter(w => w.count < TXS_PER_WALLET);
        
        // Pick one randomly
        if (availableWallets.length === 0) break;
        let activeIdx = Math.floor(Math.random() * availableWallets.length);
        let activeWallet = availableWallets[activeIdx];
        
        console.log(`\n--- Picking Wallet ID #${activeWallet.id} [${activeWallet.stxAddress}] ---`);
        
        // Fetch nonce only first time dynamically or if out-of-sync
        let nonce = 0;
        try {
            nonce = await getWalletNonce(activeWallet.stxAddress);
            activeWallet.nonce = nonce;
        } catch(e) { 
            activeWallet.nonce = 0; 
        }
        
        // Decide organically how many transactions this wallet will do this round (1 to 3)
        // unless it only needs less to reach 10
        let maxThisRound = Math.floor(Math.random() * 3) + 1; 
        const remainingForWallet = TXS_PER_WALLET - activeWallet.count;
        if (maxThisRound > remainingForWallet) maxThisRound = remainingForWallet;
        
        for (let i = 0; i < maxThisRound; i++) {
            const targetContract = getRandomContract();
            const fee = getRandomFee();
            let functionName = 'ping';
            let functionArgs = [];
            
            // Random behavioral usage
            if (targetContract === "clicker-v2p") {
                functionName = Math.random() > 0.5 ? 'click' : 'ping';
            } else if (targetContract === "quickpoll-v2p") {
                functionName = Math.random() > 0.5 ? 'vote-yes' : 'vote-no';
            } else if (targetContract === "tipjar-v2p") {
                functionName = 'quick-tip'; 
            }
            
            const txOptions = {
                contractAddress: CONTRACT_DEPLOYER,
                contractName: targetContract,
                functionName: functionName,
                functionArgs: functionArgs,
                senderKey: activeWallet.privateKey,
                validateWithAbi: false,
                network,
                fee,
                nonce: activeWallet.nonce,
                anchorMode: 3,
                postConditionMode: 1
            };
            
            let globalPositionStr = `[Tx ${activeWallet.count + 1}/${TXS_PER_WALLET} for Wallet ${activeWallet.id}]`;
            process.stdout.write(`⏳ ${globalPositionStr} Executing ${targetContract}.${functionName} (Fee: ${(fee/1000000).toFixed(4)}) `);
            const broadcast = await executeTxWithRetry(txOptions);
            
            if (!broadcast.broadcasted) {
                console.log(`❌ Failed Broadcast: ${broadcast.error}`);
            } else {
                const result = await monitorTransaction(broadcast.txid);
                if (result.success) {
                    console.log(`✅ Success`);
                    activeWallet.nonce++; 
                    activeWallet.count++;
                    totalDone++;
                } else {
                    console.log(`❌ Failed On-Chain: ${result.reason}`);
                    activeWallet.nonce++; 
                    activeWallet.count++;
                    totalDone++;
                }
            }
            
            // Artificial organic wait within an existing chain sequence
            if (i < maxThisRound - 1) {
                const randThrottle = Math.floor(Math.random() * 8000) + 5000;
                console.log(`   (waiting ${(randThrottle/1000).toFixed(1)}s before next tick for Wallet ${activeWallet.id})`);
                await delay(randThrottle);
            }
        }
        
        // Wait between changing wallets organically
        const randThrotNextWallet = Math.floor(Math.random() * 8000) + 3000;
        console.log(`   (Wallet ${activeWallet.id} pausing... randomly picking another wallet in ${(randThrotNextWallet/1000).toFixed(1)}s)`);
        
        // Sync tracker state back implicitly
        let globalIndex = interactionTracker.findIndex(w => w.id === activeWallet.id);
        interactionTracker[globalIndex] = activeWallet;
        
        await delay(randThrotNextWallet);
    }
    
    console.log(`🎉 Interaction Suite Complete! Total Txs fired: ${totalDone}`);
}

main().catch(console.error);
