import * as dotenv from "dotenv";

import { openWallet } from "./utils";
import { readdir } from "fs/promises";
import { updateMetadataFiles, uploadFolderToIPFS } from "./metadata";
import { waitSeqno } from "./delay";
import { NftCollection } from "./contracts/NftCollection";

dotenv.config();

async function init() {
  const metadataFolderPath = "./data/metadata/";
  const imagesFolderPath = "./data/images/";

  const wallet = await openWallet(process.env.MNEMONIC!.split(" "), true);

  console.log("Started uploading images to IPFS...");
  // const imagesIpfsHash = await uploadFolderToIPFS(imagesFolderPath);

  const imagesIpfsHash = "QmST3oWMmUVYM74ob2EHtrsDFLNxQKGu666iYLmEhcUnqt";

  // console.log(
  //   `Successfully uploaded the pictures to ipfs: https://gateway.pinata.cloud/ipfs/${imagesIpfsHash}`
  // );

  // https://gateway.pinata.cloud/ipfs/QmST3oWMmUVYM74ob2EHtrsDFLNxQKGu666iYLmEhcUnqt

  // console.log("Started uploading metadata files to IPFS...");
  // await updateMetadataFiles(metadataFolderPath, imagesIpfsHash);
  // const metadataIpfsHash = await uploadFolderToIPFS(metadataFolderPath);

  const metadataIpfsHash = "QmfQG2eGRrktctJzWm2JwQs4xUGhhDn1B7FYD1kRM3PPQz";
  // https://gateway.pinata.cloud/ipfs/QmfQG2eGRrktctJzWm2JwQs4xUGhhDn1B7FYD1kRM3PPQz
  // console.log(
  //   `Successfully uploaded the metadata to ipfs: https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`
  // );

  console.log("Start deploy of nft collection...");
  const balance = await wallet.contract.getBalance();
  console.log("balance", balance);
  const collectionData = {
    ownerAddress: wallet.contract.address,
    royaltyPercent: 0.05, // 0.05 = 5%
    royaltyAddress: wallet.contract.address,
    nextItemIndex: 0,
    collectionContentUrl: `ipfs://${metadataIpfsHash}/collection.json`,
    commonContentUrl: `ipfs://${metadataIpfsHash}/`,
  };
  console.log(collectionData);
  const collection = new NftCollection(collectionData);
  let seqno = await collection.deploy(wallet);
  console.log(`Collection deployed: ${collection.address}`);
  await waitSeqno(seqno, wallet);

  // collection : EQBVC-DlfPv0QINmplll8lEna_t097jfkxg1xFI8FT84SN7z
}

void init();
