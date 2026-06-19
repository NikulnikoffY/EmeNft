export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const formatTON = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${num.toFixed(2)} TON`;
};

export const isValidTonAddress = (address: string): boolean => {
  if (!address) return false;
  return /^[EUQ][A-Za-z0-9_-]{47}$/.test(address);
};

export const isValidNumber = (value: string | number, min = 0, max = Infinity): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= min && num <= max;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
