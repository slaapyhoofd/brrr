import * as React from 'react';
import { Notyf } from 'notyf';
import { IAppState } from '../interfaces';
import { ErrorReason, LnurlWriter } from '../util/lnurlwriter';
import { Field } from './field';
import { Wallet } from './wallet';
import { Print } from './print';
import { brrr } from '../batch/brrr';
import { FileDownload } from './download';
import { FileUpload } from './upload';

export default class App extends React.Component<any, IAppState> {
  private readonly lnurlWriter: LnurlWriter;
  private readonly notyf: Notyf;

  constructor(props: any) {
    super(props);
    this.state = {
      adminId: '',
      baseUrl: 'https://legend.lnbits.com',
      batchRunning: false,
      currentWalletIndex: 0,
      namePrefix: 'BATCH',
      numberOfWallets: 2,
      proxyUrl: 'proxy.php',
      readKey: '',
      wallets: [],
      writing: false,
    };

    this.lnurlWriter = new LnurlWriter();
    this.notyf = new Notyf();
  }

  public render() {
    const {
      adminId,
      baseUrl,
      currentWallet,
      currentWalletIndex,
      namePrefix,
      numberOfWallets,
      readKey,
      wallets,
    } = this.state;

    const next = () =>
      currentWalletIndex === wallets.length - 1
        ? this.setCurrentWallet(0)
        : this.setCurrentWallet(currentWalletIndex + 1);

    const previous = () =>
      currentWalletIndex === 0
        ? this.setCurrentWallet(wallets.length - 1)
        : this.setCurrentWallet(currentWalletIndex - 1);

    return (
      <>
        <main className="container do-not-print">
          <hgroup>
            <h1>nfc-brrr-machine</h1>
            <h2>Batch create nfc cards via LNBits!</h2>
          </hgroup>
          <div>
            <Field
              id="baseUrl"
              label="LNBits url"
              value={baseUrl}
              onChange={(v) => this.setState({ baseUrl: v })}
            />
            <Field
              id="adminId"
              label="LNBits admin id"
              value={adminId || ''}
              onChange={(v) => this.setState({ adminId: v })}
            />
            <Field
              id="readKey"
              label="LNBits read key"
              value={readKey || ''}
              onChange={(v) => this.setState({ readKey: v })}
            />
            <Field
              id="namePrefix"
              label="Name prefix"
              value={namePrefix}
              onChange={(v) => this.setState({ namePrefix: v })}
            />
            <Field
              id="numberOfWallets"
              label="Number of wallets"
              value={numberOfWallets + ''}
              type="number"
              onChange={(v) => this.setState({ numberOfWallets: parseInt(v, 10) || 1 })}
            />
            <FileUpload
              id="upload"
              label="Upload wallets"
              onUpload={(d) => this.setState({ wallets: d, currentWallet: d[currentWalletIndex] })}
            />
            <button id="brrr" onClick={() => this.brrr()}>
              Brrr...
            </button>
            <FileDownload fileName="wallets" caption="Download wallets" data={wallets} />
          </div>
          <Wallet wallet={currentWallet} />
          <div className="grid">
            <button id="previous" onClick={() => previous()}>
              Previous
            </button>
            <button id="write" onClick={() => this.write()}>
              Write
            </button>
            <button id="next" onClick={() => next()}>
              Next
            </button>
          </div>
        </main>
        <Print wallets={wallets} />
      </>
    );
  }

  private async brrr() {
    this.setState({ batchRunning: true });
    const wallets = await brrr(this.state);
    this.setState({
      batchRunning: false,
      wallets,
      currentWallet: wallets[this.state.currentWalletIndex],
    });
  }

  private setCurrentWallet(index: number): void {
    const newIndex = index < 0 ? 0 : index;
    this.setState({ currentWallet: this.state.wallets[newIndex], currentWalletIndex: newIndex });
  }

  private async write() {
    try {
      if (this.state.currentWallet) {
        this.setState({ writing: true });
        this.notyf.success('Starting write!');
        await this.lnurlWriter.writeUrl(this.state.currentWallet?.lnUrlW);
        this.notyf.success('Lnurlw written!');
      } else {
        this.notyf.error('No lnurl available to write!');
      }
    } catch (e: any) {
      if (e in ErrorReason) {
        this.notyf.error(ErrorReason[e]);
      } else {
        this.notyf.error(e.message);
      }
    } finally {
      this.setState({ writing: false });
    }
  }
}
