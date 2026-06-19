import { Address } from "@ton/core";

export class NftMarketplace {
  private static readonly MAINNET_ADDRESS = "EQBYTuYbLf8INxFtD8tQeNk5ZLy-nAX9ahQbG_yl1qQ-GEMS";
  private static readonly TESTNET_ADDRESS = "EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N";

  public static getAddress(testnet: boolean = true): Address {
    const addressString = testnet ? this.TESTNET_ADDRESS : this.MAINNET_ADDRESS;
    return Address.parse(addressString);
  }

  public static getMainnetAddress(): Address {
    return Address.parse(this.MAINNET_ADDRESS);
  }

  public static getTestnetAddress(): Address {
    return Address.parse(this.TESTNET_ADDRESS);
  }
}
