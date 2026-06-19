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

export class NftItem {
  private static readonly NftItemCodeBoc =
    "te6cckECDQEAAdAAART/APSkE/S88sgLAQIBYgMCAAmhH5/gBQICzgcEAgEgBgUAHQDyMs/WM8WAc8WzMntVIAA7O1E0NM/+kAg10nCAJp/AfpA1DAQJBAj4DBwWW1tgAgEgCQgAET6RDBwuvLhTYALXDIhxwCSXwPg0NMDAXGwkl8D4PpA+kAx+gAxcdch+gAx+gAw8AIEs44UMGwiNFIyxwXy4ZUB+kDUMBAj8APgBtMf0z+CEF/MPRRSMLqOhzIQN14yQBPgMDQ0NTWCEC/LJqISuuMCXwSED/LwgCwoAcnCCEIt3FzUFyMv/UATPFhAkgEBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AAH2UTXHBfLhkfpAIfAB+kDSADH6AIIK+vCAG6EhlFMVoKHeItcLAcMAIJIGoZE24iDC//LhkiGOPoIQBRONkchQCc8WUAvPFnEkSRRURqBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7ABBHlBAqN1viDACCAo41JvABghDVMnbbEDdEAG1xcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wCTMDI04lUC8ANqhGIu";

  public static getAddressByIndex(
    collectionAddress: Address,
    index: number
  ): Address {
    const code = Cell.fromBase64(this.NftItemCodeBoc);
    const data = beginCell()
      .storeAddress(collectionAddress)
      .storeUint(index, 64)
      .endCell();

    const stateInit: StateInit = { code, data };
    return contractAddress(0, stateInit);
  }

  public static createTransferBody(params: {
    newOwner: Address;
    responseTo?: Address;
    forwardAmount?: bigint;
  }): Cell {
    const msgBody = beginCell();
    msgBody.storeUint(0x5fcc3d14, 32); // op-code for transfer
    msgBody.storeUint(0, 64); // query-id
    msgBody.storeAddress(params.newOwner);
    msgBody.storeAddress(params.responseTo || null);
    msgBody.storeBit(false); // no custom payload
    msgBody.storeCoins(params.forwardAmount || toNano("0.02"));
    msgBody.storeBit(false); // no forward_payload

    return msgBody.endCell();
  }

  public static async transfer(
    wallet: OpenedWallet,
    nftAddress: Address,
    newOwner: Address
  ): Promise<number> {
    const seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: "0.05",
          to: nftAddress,
          body: this.createTransferBody({
            newOwner,
            responseTo: wallet.contract.address,
            forwardAmount: toNano("0.02"),
          }),
        }),
      ],
      sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
    });
    return seqno;
  }
}
