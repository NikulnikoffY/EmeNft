import {
  Address,
  Cell,
  beginCell,
  contractAddress,
  StateInit,
  SendMode,
  internal,
  toNano,
} from "@ton/core";
import { OpenedWallet } from "../utils";

export type GetGemsSaleData = {
  isComplete: boolean;
  createdAt: number;
  marketplaceAddress: Address;
  nftAddress: Address;
  nftOwnerAddress: Address | null;
  fullPrice: bigint;
  marketplaceFeeAddress: Address;
  marketplaceFee: bigint;
  royaltyAddress: Address;
  royaltyAmount: bigint;
};

export class NftSale {
  private data: GetGemsSaleData;

  constructor(data: GetGemsSaleData) {
    this.data = data;
  }

  private createCodeCell(): Cell {
    const NftFixPriceSaleV2CodeBoc =
      "te6cckECFAEAAdAAART/APSkE/S88sgLAQIBYgMCAAmhH5/gBQICzgcEAgEgBgUAHQDyMs/WM8WAc8WzMntVIAA7O1E0NM/+kAg10nCAJp/AfpA1DAQJBAj4DBwWW1tgAgEgCQgAET6RDBwuvLhTYALXDIhxwCSXwPg0NMDAXGwkl8D4PpA+kAx+gAxcdch+gAx+gAw8AIEs44UMGwiNFIyxwXy4ZUB+kDUMBAj8APgBtMf0z+CEF/MPRRSMLqOhzIQN14yQBPgMDQ0NTWCEC/LJqISuuMCXwSED/LwgCwoAcnCCEIt3FzUFyMv/UATPFhAkgEBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AAH2UTXHBfLhkfpAIfAB+kDSADH6AIIK+vCAG6EhlFMVoKHeItcLAcMAIJIGoZE24iDC//LhkiGOPoIQBRONkchQCc8WUAvPFnEkSRRURqBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7ABBHlBAqN1viDACCAo41JvABghDVMnbbEDdEAG1xcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wCTMDI04lUC8ANqhGIu";

    return Cell.fromBase64(NftFixPriceSaleV2CodeBoc);
  }

  private createDataCell(): Cell {
    const data = this.data;
    const dataCell = beginCell();

    dataCell.storeBit(data.isComplete);
    dataCell.storeUint(data.createdAt, 32);
    dataCell.storeAddress(data.marketplaceAddress);
    dataCell.storeAddress(data.nftAddress);
    dataCell.storeAddress(data.nftOwnerAddress);
    dataCell.storeCoins(data.fullPrice);
    dataCell.storeAddress(data.marketplaceFeeAddress);
    dataCell.storeCoins(data.marketplaceFee);
    dataCell.storeAddress(data.royaltyAddress);
    dataCell.storeCoins(data.royaltyAmount);

    return dataCell.endCell();
  }

  public get stateInit(): StateInit {
    const code = this.createCodeCell();
    const data = this.createDataCell();

    return { code, data };
  }

  public get address(): Address {
    return contractAddress(0, this.stateInit);
  }

  public async deploy(wallet: OpenedWallet): Promise<number> {
    const stateInit = beginCell()
      .store(storeStateInit(this.stateInit))
      .endCell();

    const payload = beginCell();
    payload.storeUint(1, 32); // op-code for new sale contract deployment
    payload.storeCoins(toNano("0.05"));
    payload.storeRef(stateInit);
    payload.storeRef(new Cell());

    const seqno = await wallet.contract.getSeqno();
    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: "0.05",
          to: this.data.marketplaceAddress,
          body: payload.endCell(),
        }),
      ],
      sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
    });
    return seqno;
  }
}

function storeStateInit(src: StateInit): (builder: any) => void {
  return (builder) => {
    builder.storeBit(src.code !== null);
    if (src.code !== null) {
      builder.storeRef(src.code);
    }
    builder.storeBit(src.data !== null);
    if (src.data !== null) {
      builder.storeRef(src.data);
    }
  };
}
