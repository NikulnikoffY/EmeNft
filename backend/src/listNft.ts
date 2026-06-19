import * as dotenv from "dotenv";
import { Address, toNano } from "@ton/core";
import { openWallet } from "./utils";
import { waitSeqno } from "./delay";
import { NftCollection } from "./contracts/NftCollection";
import { NftSale, GetGemsSaleData } from "./contracts/NftSale";
import { NftItem } from "./contracts/NftItem";
import { NftMarketplace } from "./contracts/NftMarketplace";

dotenv.config();

async function listNft() {
  // Configuration
  const nftIndex = Number(process.env.NFT_INDEX || 0);
  const salePrice = Number(process.env.SALE_PRICE || 10);
  const marketplaceFee = Number(process.env.MARKETPLACE_FEE || 1);
  const royaltyAmount = Number(process.env.ROYALTY_AMOUNT || 0.5);
  const testnet = (process.env.TESTNET ?? "true").toLowerCase() !== "false";

  console.log("=== GetGems NFT Listing Script ===");
  console.log(`NFT Index: ${nftIndex}`);
  console.log(`Sale Price: ${salePrice} TON`);
  console.log(`Marketplace Fee: ${marketplaceFee} TON`);
  console.log(`Royalty Amount: ${royaltyAmount} TON`);
  console.log(`Network: ${testnet ? "Testnet" : "Mainnet"}`);

  // Load wallet
  const wallet = await openWallet(process.env.MNEMONIC!.split(" "), testnet);
  console.log(`Wallet Address: ${wallet.contract.address}`);

  // Collection data (you can modify these values)
  const collectionData = {
    ownerAddress: wallet.contract.address,
    royaltyPercent: 0.05, // 5%
    royaltyAddress: wallet.contract.address,
    nextItemIndex: 0,
    collectionContentUrl: process.env.COLLECTION_CONTENT_URL || "ipfs://QmfQG2eGRrktctJzWm2JwQs4xUGhhDn1B7FYD1kRM3PPQz/collection.json",
    commonContentUrl: process.env.COMMON_CONTENT_URL || "ipfs://QmfQG2eGRrktctJzWm2JwQs4xUGhhDn1B7FYD1kRM3PPQz/",
  };

  const collection = new NftCollection(collectionData);
  console.log(`Collection Address: ${collection.address}`);

  // Get NFT address
  const nftAddress = NftItem.getAddressByIndex(collection.address, nftIndex);
  console.log(`NFT Address: ${nftAddress}`);

  // Get marketplace address
  const marketplaceAddress = NftMarketplace.getAddress(testnet);
  console.log(`Marketplace Address: ${marketplaceAddress}`);

  // Create sale data
  const saleData: GetGemsSaleData = {
    isComplete: false,
    createdAt: Math.ceil(Date.now() / 1000),
    marketplaceAddress,
    nftAddress,
    nftOwnerAddress: null,
    fullPrice: toNano(salePrice.toString()),
    marketplaceFeeAddress: wallet.contract.address,
    marketplaceFee: toNano(marketplaceFee.toString()),
    royaltyAddress: wallet.contract.address,
    royaltyAmount: toNano(royaltyAmount.toString()),
  };

  console.log("\n=== Deploying Sale Contract ===");
  const nftSale = new NftSale(saleData);
  let seqno = await nftSale.deploy(wallet);
  console.log(`Sale Contract Deployed: ${nftSale.address}`);
  console.log(`Transaction Seqno: ${seqno}`);
  
  await waitSeqno(seqno, wallet);
  console.log("Sale contract deployment confirmed!");

  console.log("\n=== Transferring NFT to Sale Contract ===");
  seqno = await NftItem.transfer(wallet, nftAddress, nftSale.address);
  console.log(`NFT Transfer Transaction Seqno: ${seqno}`);
  
  await waitSeqno(seqno, wallet);
  console.log("NFT transfer confirmed!");

  console.log("\n=== Listing Complete! ===");
  console.log(`Sale Contract: ${nftSale.address}`);
  console.log(`NFT Address: ${nftAddress}`);
  console.log(`Collection Address: ${collection.address}`);
  
  if (testnet) {
    console.log(`\nView on GetGems Testnet:`);
    console.log(`Collection: https://testnet.getgems.io/collection/${collection.address.toString({ bounceable: false })}`);
    console.log(`NFT: https://testnet.getgems.io/nft/${nftAddress.toString({ bounceable: false })}`);
  } else {
    console.log(`\nView on GetGems:`);
    console.log(`Collection: https://getgems.io/collection/${collection.address.toString({ bounceable: false })}`);
    console.log(`NFT: https://getgems.io/nft/${nftAddress.toString({ bounceable: false })}`);
  }
}

// Run the script
void listNft().catch(console.error);
