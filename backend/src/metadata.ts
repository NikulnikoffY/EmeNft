import pinataSDK from "@pinata/sdk";
import { readdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function uploadFolderToIPFS(folderPath: string): Promise<string> {
  try {
    const pinata = new pinataSDK({
      pinataApiKey: process.env.PINATA_API_KEY,
      pinataSecretApiKey: process.env.PINATA_API_SECRET,
    });

    const response = await pinata.pinFromFS(folderPath);
    return response.IpfsHash;
  } catch (e) {
    console.log(e);
    return "ds";
  }
}

export async function updateMetadataFiles(
  metadataFolderPath: string,
  imagesIpfsHash: string
): Promise<void> {
  const files = readdirSync(metadataFolderPath);

  files.forEach(async (filename, index) => {
    console.log(files);
    const filePath = path.join(metadataFolderPath, filename);

    console.log(filePath);
    const file = await readFile(filePath);

    const metadata = JSON.parse(file.toString());

    console.log(metadata);
    metadata.image =
      index != files.length - 1
        ? `ipfs://${imagesIpfsHash}/${index}.jpg`
        : `ipfs://${imagesIpfsHash}/logo.jpg`;

    console.log(metadata);
    await writeFile(filePath, JSON.stringify(metadata));
  });
}
