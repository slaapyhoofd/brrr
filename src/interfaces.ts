export interface IAppState {
  adminId?: string;
  baseUrl: string;
  batchRunning: boolean;
  currentWallet?: IWalletInfo;
  currentWalletIndex: number;
  namePrefix: string;
  numberOfWallets: number;
  proxyUrl: string;
  readKey?: string;
  wallets: IWalletInfo[];
  writing: boolean;
}

export interface IWalletInfo {
  adminUrlLnBits: string;
  adminUrlLnBitsQR?: string;
  adminUrlLndHub: string;
  adminUrlLndHubQR?: string;
  lnUrlW: string;
  walletName?: string;
}
