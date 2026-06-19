export interface Collection {
  address: string;
  ownerAddress: string;
  name: string;
  description: string;
  image: string;
  royaltyPercent: number;
  royaltyAddress: string;
  nextItemIndex: number;
}

export interface CollectionData {
  ownerAddress: string;
  royaltyPercent: number;
  royaltyAddress: string;
  nextItemIndex: number;
  collectionContentUrl: string;
  commonContentUrl: string;
}

export interface CollectionMetadata {
  name: string;
  description: string;
  social_links: string[];
  image: string;
}
