import { IParametersOutput, IWalletInfo, OutputTypes } from '../interfaces';

export interface IPrintProps {
  parameters: IParametersOutput;
  wallets: IWalletInfo[];
}

export interface IPrintQRProps {
  show: boolean;
  type: OutputTypes;
  wallet: IWalletInfo;
}

export const PrintQR = ({ show, type, wallet }: IPrintQRProps): JSX.Element | null => {
  const mapTypeToQr = (type: OutputTypes, wallet: IWalletInfo): string | undefined => {
    switch (type) {
      case 'lndhub':
        return wallet.adminUrlLndHubQR;
      case 'lnbits':
        return wallet.adminUrlLnBitsQR;
      case 'lnurlp':
        return wallet.lnUrlPQR;
      case 'lnurlw':
        return wallet.lnUrlWQR;
      default:
        return undefined;
    }
  };
  const qr = mapTypeToQr(type, wallet);
  return show && qr ? (
    <div className="column">
      <div className="box">
        <img alt={wallet.walletName} src={qr} className="box-img" />
        <p className="box-tag">
          {wallet.walletName}-{type}
        </p>
      </div>
    </div>
  ) : null;
};

export const Print = ({ parameters, wallets }: IPrintProps): JSX.Element => (
  <div className="print">
    <div className="columns">
      {wallets.map((w, i) => (
        <>
          <PrintQR
            show={parameters.qr.indexOf('lndhub') !== -1}
            type="lndhub"
            wallet={w}
            key={`${i}-lndhub-${w.walletName}`}
          />
          <PrintQR
            show={parameters.qr.indexOf('lnbits') !== -1}
            type="lnbits"
            wallet={w}
            key={`${i}-lnbits-${w.walletName}`}
          />
          <PrintQR
            show={parameters.qr.indexOf('lnurlp') !== -1}
            type="lnurlp"
            wallet={w}
            key={`${i}-lnurlp-${w.walletName}`}
          />
          <PrintQR
            show={parameters.qr.indexOf('lnurlw') !== -1}
            type="lnurlw"
            wallet={w}
            key={`${i}-lnurlw-${w.walletName}`}
          />
        </>
      ))}
    </div>
  </div>
);
