import { IParametersOutput, IWalletInfo, OutputTypes } from '../interfaces';
import { QR } from './qr';
import { Radio } from './radio';
import { removeItem } from '../util/array';

interface IWalletProps {
  wallet?: IWalletInfo;
  parameters: IParametersOutput;
  next(): void;
  previous(): void;
  updateParameters(p: IParametersOutput): void;
  write(): void;
}

export const Wallet = ({
  wallet,
  next,
  parameters,
  previous,
  updateParameters,
  write,
}: IWalletProps) => {
  if (!wallet) {
    return null;
  }

  const { adminUrlLndHubQR, lnUrlPQR, lnUrlWQR, adminUrlLnBitsQR, walletName } = wallet;
  const { qr, nfc } = parameters;

  const updateQR = (type: OutputTypes, value: boolean) => {
    if (value) {
      updateParameters({ ...parameters, qr: [...qr, type] });
    } else if (!value) {
      updateParameters({ ...parameters, qr: removeItem(qr, type) });
    }
  };

  return (
    <article>
      <header>Output of wallet {walletName}</header>
      <Radio value={nfc} onChange={(v) => updateParameters({ ...parameters, nfc: v })} />
      <p>Which QR do you want to print to a sticker?</p>
      <div className="grid">
        <QR
          qr={adminUrlLndHubQR}
          type="lndhub"
          checked={qr.indexOf('lndhub') !== -1}
          onChange={(v) => updateQR('lndhub', v)}
        />
        <QR
          qr={lnUrlPQR}
          type="lnurlp"
          checked={qr.indexOf('lnurlp') !== -1}
          onChange={(v) => updateQR('lnurlp', v)}
        />
        <QR
          qr={lnUrlWQR}
          type="lnurlw"
          checked={qr.indexOf('lnurlw') !== -1}
          onChange={(v) => updateQR('lnurlw', v)}
        />
        <QR
          qr={adminUrlLnBitsQR}
          type="lnbits"
          checked={qr.indexOf('lnbits') !== -1}
          onChange={(v) => updateQR('lnbits', v)}
        />
      </div>
      <footer>
        <div className="grid">
          <button id="previous" onClick={() => previous()}>
            Previous
          </button>
          <button id="write" onClick={() => write()}>
            Write
          </button>
          <button id="next" onClick={() => next()}>
            Next
          </button>
        </div>
      </footer>
    </article>
  );
};
