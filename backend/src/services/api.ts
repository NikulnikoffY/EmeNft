import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { CollectionData } from '../types/collection.types';
import { CreateSaleRequest } from '../types/marketplace.types';
import { MarketplaceInfo } from '../types/marketplace.types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Collection endpoints
  async getCollectionAddress(collectionData: CollectionData) {
    const response = await this.client.post('/nft/address', collectionData);
    return response.data;
  }

  async getCollectionStateInit(collectionData: CollectionData) {
    const response = await this.client.post('/nft/state-init', collectionData);
    return response.data;
  }

  async deployCollection(collectionData: CollectionData) {
    const response = await this.client.post('/nft/deploy', collectionData);
    return response.data;
  }

  async topUpCollection(collectionData: CollectionData, nftAmount: number) {
    const response = await this.client.post('/nft/top-up', {
      ...collectionData,
      nftAmount
    });
    return response.data;
  }

  // NFT Item endpoints
  async getNftItemAddress(collectionAddress: string, itemIndex: number) {
    const response = await this.client.post('/nft/item/address', {
      collectionAddress,
      itemIndex
    });
    return response.data;
  }

  // Marketplace endpoints
  async getMarketplaceAddress(): Promise<MarketplaceInfo> {
    const response = await this.client.get('/nft/marketplace/address');
    return response.data;
  }

  async createSaleContract(request: CreateSaleRequest) {
    const response = await this.client.post('/nft/sale/create', request);
    return response.data;
  }

  async transferNftToSale(nftAddress: string, saleAddress: string) {
    const response = await this.client.post('/nft/sale/transfer', {
      nftAddress,
      saleAddress
    });
    return response.data;
  }
}

export const apiService = new ApiService();
