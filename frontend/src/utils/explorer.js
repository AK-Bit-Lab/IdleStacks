import { APP_NETWORK } from './constants';

export const getExplorerUrl = (txId) => {
  const isTestnet = APP_NETWORK.isMainnet() === false;
  const chain = isTestnet ? 'testnet' : 'mainnet';
  const cleanTxId = txId.startsWith('0x') ? txId : `0x${txId}`;
  return `https://explorer.hiro.so/txid/${cleanTxId}?chain=${chain}`;
};

export const getAddressUrl = (address) => {
  const isTestnet = APP_NETWORK.isMainnet() === false;
  const chain = isTestnet ? 'testnet' : 'mainnet';
  return `https://explorer.hiro.so/address/${address}?chain=${chain}`;
};
