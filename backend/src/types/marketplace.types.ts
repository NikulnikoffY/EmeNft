export interface SaleData {
  saleAddress: string;
  nftAddress: string;
  fullPrice: string;
  marketplaceFee: string;
  royaltyAmount: string;
  marketplaceAddress: string;
}

export interface CreateSaleRequest {
  collectionData: any;
  nftIndex: number;
  salePrice: number;
  marketplaceFee?: number;
  royaltyAmount?: number;
}

export interface MarketplaceInfo {
  marketplaceAddress: string;
  testnet: boolean;
}
