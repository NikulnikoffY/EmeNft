export interface NFT {
  index: number;
  name: string;
  description: string;
  image: string;
  address: string;
  owner?: string;
  attributes?: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: string | number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Attribute[];
}
