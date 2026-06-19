import { OpenedWallet } from "./utils";

export async function waitSeqno(seqno: number, wallet: OpenedWallet) {
  console.log("seqno", seqno);
  for (let attempt = 0; attempt < 10; attempt++) {
    console.log("attempt", attempt);
    await sleep(2000);
    const seqnoAfter = await wallet.contract.getSeqno();
    console.log("seqnoAfter", seqnoAfter);
    if (seqnoAfter == seqno + 1) break;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
