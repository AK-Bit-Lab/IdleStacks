export const shortenTxId = (txId) => {
  if (!txId) return '';
  const clean = txId.startsWith('0x') ? txId.substring(2) : txId;
  if (clean.length < 12) return txId;
  return \`0x\${clean.substring(0, 4)}...\${clean.substring(clean.length - 4)}\`;
};

export const stacksToUSD = (stxAmount, priceUsd) => {
  if (!stxAmount || !priceUsd) return 0;
  return Number((stxAmount * priceUsd).toFixed(2));
};
