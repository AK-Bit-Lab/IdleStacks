export const isValidAddress = (address) => {
  return typeof address === 'string' && address.length > 20 && address.startsWith('SP');
};
