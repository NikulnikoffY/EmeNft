export const validateCollectionForm = (data: {
  name: string;
  description: string;
  royaltyPercent: number;
  images: File[];
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('Collection name is required');
  }

  if (!data.description.trim()) {
    errors.push('Collection description is required');
  }

  if (data.royaltyPercent < 0 || data.royaltyPercent > 25) {
    errors.push('Royalty percentage must be between 0 and 25');
  }

  if (data.images.length === 0) {
    errors.push('At least one image is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateListingForm = (data: {
  collectionAddress: string;
  nftIndex: number;
  salePrice: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.collectionAddress.trim()) {
    errors.push('Collection address is required');
  }

  if (data.nftIndex < 0) {
    errors.push('NFT index must be 0 or greater');
  }

  if (data.salePrice <= 0) {
    errors.push('Sale price must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
