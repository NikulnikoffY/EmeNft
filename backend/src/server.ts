import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { Address, toNano } from "@ton/core";
import { NftCollection, collectionData } from "./contracts/NftCollection";
import { NftSale, GetGemsSaleData } from "./contracts/NftSale";
import { NftItem } from "./contracts/NftItem";
import { NftMarketplace } from "./contracts/NftMarketplace";
import { openWallet, OpenedWallet } from "./utils";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Serve React build files
app.use(express.static(path.join(__dirname, "../dist")));

// Handle React Router (SPA fallback)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function buildCollectionFromBody(body: any): NftCollection {
  const ownerAddress = Address.parse(body.ownerAddress);
  const royaltyPercent = Number(body.royaltyPercent);
  const royaltyAddress = Address.parse(body.royaltyAddress);
  const nextItemIndex = Number(body.nextItemIndex ?? 0);
  const collectionContentUrl = String(body.collectionContentUrl);
  const commonContentUrl = String(body.commonContentUrl);

  const data: collectionData = {
    ownerAddress,
    royaltyPercent,
    royaltyAddress,
    nextItemIndex,
    collectionContentUrl,
    commonContentUrl,
  };
  return new NftCollection(data);
}

async function openServerWallet(): Promise<OpenedWallet> {
  const mnemonic = requireEnv("MNEMONIC").split(" ");
  const testnet = (process.env.TESTNET ?? "true").toLowerCase() !== "false";
  return openWallet(mnemonic, testnet);
}

app.post("/nft/address", (req, res) => {
  try {
    const collection = buildCollectionFromBody(req.body);
    return res.json({ address: collection.address.toString({ bounceable: false }) });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

app.post("/nft/state-init", (req, res) => {
  try {
    const collection = buildCollectionFromBody(req.body);
    const stateInit = collection.stateInit;
    return res.json({
      code: stateInit.code?.toBoc().toString("base64"),
      data: stateInit.data?.toBoc().toString("base64"),
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

app.post("/nft/deploy", async (req, res) => {
  try {
    const collection = buildCollectionFromBody(req.body);
    const wallet = await openServerWallet();
    const seqno = await collection.deploy(wallet);
    return res.json({ seqno, address: collection.address.toString({ bounceable: false }) });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

app.post("/nft/top-up", async (req, res) => {
  try {
    const { nftAmount } = req.body;
    if (nftAmount === undefined) {
      return res.status(400).json({ error: "nftAmount is required" });
    }
    const collection = buildCollectionFromBody(req.body);
    const wallet = await openServerWallet();
    const seqno = await collection.topUpBalance(wallet, Number(nftAmount));
    return res.json({ seqno, address: collection.address.toString({ bounceable: false }) });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

// GetGems Marketplace endpoints
app.post("/nft/sale/create", async (req, res) => {
  try {
    const {
      collectionData: collectionDataBody,
      nftIndex,
      salePrice,
      marketplaceFee,
      royaltyAmount,
    } = req.body;

    if (!collectionDataBody || nftIndex === undefined || !salePrice) {
      return res.status(400).json({ 
        error: "collectionData, nftIndex, and salePrice are required" 
      });
    }

    const collection = buildCollectionFromBody(collectionDataBody);
    const wallet = await openServerWallet();
    const testnet = (process.env.TESTNET ?? "true").toLowerCase() !== "false";
    
    const nftAddress = NftItem.getAddressByIndex(collection.address, Number(nftIndex));
    const marketplaceAddress = NftMarketplace.getAddress(testnet);
    
    const saleData: GetGemsSaleData = {
      isComplete: false,
      createdAt: Math.ceil(Date.now() / 1000),
      marketplaceAddress,
      nftAddress,
      nftOwnerAddress: null,
      fullPrice: toNano(salePrice.toString()),
      marketplaceFeeAddress: wallet.contract.address,
      marketplaceFee: toNano((marketplaceFee || 1).toString()),
      royaltyAddress: wallet.contract.address,
      royaltyAmount: toNano((royaltyAmount || 0.5).toString()),
    };

    const nftSale = new NftSale(saleData);
    const seqno = await nftSale.deploy(wallet);
    
    return res.json({
      seqno,
      saleAddress: nftSale.address.toString({ bounceable: false }),
      nftAddress: nftAddress.toString({ bounceable: false }),
      marketplaceAddress: marketplaceAddress.toString({ bounceable: false }),
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

app.post("/nft/sale/transfer", async (req, res) => {
  try {
    const { nftAddress, saleAddress } = req.body;
    
    if (!nftAddress || !saleAddress) {
      return res.status(400).json({ 
        error: "nftAddress and saleAddress are required" 
      });
    }

    const wallet = await openServerWallet();
    const nftAddr = Address.parse(nftAddress);
    const saleAddr = Address.parse(saleAddress);
    
    const seqno = await NftItem.transfer(wallet, nftAddr, saleAddr);
    
    return res.json({ seqno });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

app.post("/nft/item/address", (req, res) => {
  try {
    const { collectionAddress, itemIndex } = req.body;
    
    if (!collectionAddress || itemIndex === undefined) {
      return res.status(400).json({ 
        error: "collectionAddress and itemIndex are required" 
      });
    }

    const collectionAddr = Address.parse(collectionAddress);
    const nftAddress = NftItem.getAddressByIndex(collectionAddr, Number(itemIndex));
    
    return res.json({ 
      nftAddress: nftAddress.toString({ bounceable: false }) 
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

app.get("/nft/marketplace/address", (_req, res) => {
  try {
    const testnet = (process.env.TESTNET ?? "true").toLowerCase() !== "false";
    const marketplaceAddress = NftMarketplace.getAddress(testnet);
    
    return res.json({ 
      marketplaceAddress: marketplaceAddress.toString({ bounceable: false }),
      testnet 
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? String(err) });
  }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});



