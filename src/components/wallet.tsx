import * as React from 'react';
import { IWalletInfo } from '../interfaces';
import { QR } from './qr';

interface IWalletProps {
  wallet?: IWalletInfo;
  next(): void;
  previous(): void;
  write(): void;
}

export const Wallet = ({ wallet, next, previous, write }: IWalletProps) => {
  if (!wallet) {
    return null;
  }

  const { adminUrlLndHubQR, lnUrlPQR, lnUrlWQR, walletName } = wallet;

  return (
    <article>
      <header>{walletName}</header>
      <div className="grid">
        <QR qr={adminUrlLndHubQR} text="lndhub" />
        <QR qr={lnUrlPQR} text="lnurlp" />
        <QR qr={lnUrlWQR} text="lnurlw" />
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
