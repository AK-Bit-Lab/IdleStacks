const fetch = require('cross-fetch');

// Reliable fetch with built-in retries to prevent ETIMEDOUT crashes 
async function fetchWithRetry(url, options = {}, retries = 5, backoff = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            
            if (res.status === 429) {
                console.log(`⚠️ Rate limit (429) hit at ${url}. Retrying in ${backoff}ms...`);
                await delay(backoff);
                backoff *= 1.5; // exponential backoff
                continue;
            }

            if (!res.ok) {
                 return res; // let calling func handle 404, etc.
            }
            return res; 
        } catch (err) {
            console.log(`⚠️ Network fault (${err.code || err.message}). Retrying in ${backoff}ms. (${i + 1}/${retries})`);
            await delay(backoff);
            backoff *= 1.5;
        }
    }
    return { ok: false, error: `Max retries reached for ${url}` }; // Instead of throw Error to prevent node from crashing
}

// Helper to reliably check transaction status on-chain
async function monitorTransaction(txid) {
    while (true) {
        try {
            const res = await fetchWithRetry(`https://api.mainnet.hiro.so/extended/v1/tx/${txid}`, {}, 3);
            if (res && res.status === 200) {
                const data = await res.json();
                if (data.tx_status === "success") return { success: true };
                if (data.tx_status === "abort_by_response" || data.tx_status === "abort_by_post_condition") {
                    return { success: false, reason: data.tx_status };
                }
            }
        } catch(e) {
            // Ignore timeouts or max retries while polling on-chain tx, just loop again organically
        }
        await delay(10000); 
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fixed balance fetcher extracting from the hex structure reliably using retry wrapped fetch
async function getWalletBalance(address) {
    const res = await fetchWithRetry(`https://api.mainnet.hiro.so/v2/accounts/${address}`);
    if(!res || !res.ok) return 0;
    try {
        const data = await res.json();
        if(data.balance && data.balance.startsWith('0x')) {
           return parseInt(data.balance, 16); 
        }
        return parseInt(data.balance || 0, 10);
    } catch(e) {
        return 0; // if json parsing fails due to bad response
    }
}

// Fixed nonce fetcher extracting properly using retry wrapped fetch
async function getWalletNonce(address) {
    const res = await fetchWithRetry(`https://api.mainnet.hiro.so/v2/accounts/${address}`);
    if(!res || !res.ok) return 0;
    try {
        const data = await res.json();
        return data.nonce || 0;
    } catch(e) {
        return 0;
    }
}

module.exports = { fetchWithRetry, monitorTransaction, delay, shuffleArray, getWalletBalance, getWalletNonce };
