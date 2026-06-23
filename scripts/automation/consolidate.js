const fs = require('fs');
const { STACKS_MAINNET } = require('@stacks/network');
const { makeSTXTokenTransfer, broadcastTransaction } = require('@stacks/transactions');
const { fetchWithRetry, monitorTransaction, delay, getWalletBalance, getWalletNonce } = require('./utils');

const network = { ...STACKS_MAINNET, url: "https://api.mainnet.hiro.so" };
const WALLETS_FILE = './scripts/automation/wallets.json';
const MIN_FEE = 4500;

const DEPLOYER_ADDRESS = "SP2KK5E7D3NFTSDMSJ7SFK99YY68194E3J2H6TT96"; // Sweeping left-overs to the deployer directly or arbitrary wallet.

async function main() {
    if (!fs.existsSync(WALLETS_FILE)) return console.log("❌ Wallets not found.");
    let wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf8'));
    
    console.log(`🚀 Sweeping remaining dust to ${DEPLOYER_ADDRESS}...`);
    
    for (let i = 0; i < wallets.length; i++) {
        try {
            const w = wallets[i];
            const bal = await getWalletBalance(w.stxAddress);
            const nonce = await getWalletNonce(w.stxAddress);
            
            if (bal > MIN_FEE) {
                const sendAmt = bal - MIN_FEE; 
                const txOptions = {
                    recipient: DEPLOYER_ADDRESS,
                    amount: sendAmt,
                    senderKey: w.privateKey,
                    network,
                    fee: MIN_FEE,
                    nonce: nonce,
                    anchorMode: 3
                };
                
                const transaction = await makeSTXTokenTransfer(txOptions);
                const result = await broadcastTransaction(transaction, network);
                if(result.error) {
                    console.log(`❌ Sweep broadcast failed for ${w.stxAddress}: ${result.error}`);
                    continue;
                }
                
                console.log(`⏳ Sweeping ${(sendAmt/1000000).toFixed(4)} STX back to Funder from ${w.stxAddress}...`);
                const status = await monitorTransaction(result.txid);
                if (status.success) {
                    console.log(`✅ Swept successfully.`);
                } else {
                    console.log(`❌ Sweep failed.`);
                }
            } else {
                console.log(`⏩ Skipping ${w.stxAddress}, dust too low to sweep.`);
            }
        } catch(e) {
             console.log(`❌ Error sweeping: ${e.message}`);
        }
        await delay(Math.floor(Math.random() * 3000) + 1000); 
    }
}

main().catch(console.error);
