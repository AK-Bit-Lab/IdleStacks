const fs = require('fs');
const { generateSecretKey, generateWallet } = require('@stacks/wallet-sdk');
const crypto = require('crypto');

const TOTAL_WALLETS = 107;
const WALLETS_FILE = './scripts/automation/wallets.json';

async function main() {
    console.log(`🚀 Generating ${TOTAL_WALLETS} wallets randomly...`);
    const wallets = [];
    for (let i = 0; i < TOTAL_WALLETS; i++) {
        const pwd = crypto.randomBytes(32).toString('hex');
        
        // Native built-in generation from official Stacks library (passing 24 words mnemonic specifically)
        const secretKey = generateSecretKey();
        const wallet = await generateWallet({ password: pwd, secretKey: secretKey });
        
        // The generateWallet function derives stx address differently. We use default account #0
        const acct = wallet.accounts[0];
        // Standard wallet-sdk doesn't always show address directly on object without generating it, but it provides keys
        // Let's import transaction to grab address from privkey
        const { getAddressFromPrivateKey } = require('@stacks/transactions');
        const stxAddress = getAddressFromPrivateKey(acct.stxPrivateKey, "mainnet");
        
        wallets.push({
            id: i + 1,
            mnemonic: secretKey,
            privateKey: acct.stxPrivateKey,
            stxAddress: stxAddress
        });
    }
    fs.writeFileSync(WALLETS_FILE, JSON.stringify(wallets, null, 2));
    console.log(`✅ Saved ${TOTAL_WALLETS} wallets to ${WALLETS_FILE}`);
}

main().catch(console.error);
