import { Component } from 'react';
import { Notyf } from 'notyf';
import { IAppState } from '../interfaces';
import { ErrorReason, LnurlWriter } from '../util/lnurlwriter';
import { Wallet } from './wallet';
import { Print } from './print';
import { brrr } from '../batch/brrr';
import { Header } from './header';
import { DefaultAppState } from '../defaults';
import { ParametersBatch } from './parametersBatch';
import { ParametersLnurlW } from './parametersLnurlW';
import { ParametersLnurlP } from './parametersLnurlP';
import { ParametersInvoice } from './parametersInvoice';

export default class App extends Component<unknown, IAppState> {
  private readonly lnurlWriter: LnurlWriter;
  private readonly notyf: Notyf;

  constructor(props: unknown) {
    super(props);
    this.state = DefaultAppState;

    this.lnurlWriter = new LnurlWriter();
    this.notyf = new Notyf();
  }

  public render() {
    const {
      currentWallet,
      currentWalletIndex,
      parametersBatch,
      parametersInvoice,
      parametersLnurlP,
      parametersLnurlW,
      parametersOutput,
      progress,
      progressMessage,
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
          <Header />
          <ParametersBatch
            parameters={parametersBatch}
            progress={progress}
            progressMessage={progressMessage}
            wallets={wallets}
            brrr={() => this.brrr()}
            updateParameters={(p) => this.setState({ parametersBatch: p })}
            updateWallets={(w) =>
              this.setState({ wallets: w, currentWallet: w[currentWalletIndex] })
            }
          />
          <ParametersLnurlW
            enabled={parametersBatch.lnurlWEnabled}
            parameters={parametersLnurlW}
            updateParameters={(p) => this.setState({ parametersLnurlW: p })}
          />
          <ParametersLnurlP
            enabled={parametersBatch.lnurlPEnabled}
            parameters={parametersLnurlP}
            updateParameters={(p) => this.setState({ parametersLnurlP: p })}
          />
          <ParametersInvoice
            enabled={parametersBatch.invoiceEnabled}
            parameters={parametersInvoice}
            updateParameters={(p) => this.setState({ parametersInvoice: p })}
          />
          <Wallet
            wallet={currentWallet}
            parameters={parametersOutput}
            updateParameters={(p) => this.setState({ parametersOutput: p })}
            next={() => next()}
            previous={() => previous()}
            write={() => this.write()}
          />
        </main>
        <Print wallets={wallets} parameters={parametersOutput} />
      </>
    );
  }

  private async brrr() {
    try {
      const {
        parametersLnurlP,
        parametersLnurlW,
        parametersBatch,
        parametersInvoice,
        currentWalletIndex,
      } = this.state;

      this.setState({ batchRunning: true });

      const wallets = await brrr(
        parametersBatch,
        parametersInvoice,
        parametersLnurlP,
        parametersLnurlW,
        (i, m) => this.setState({ progress: i, progressMessage: m }),
        (e) => this.notyf.error(e),
      );

      this.setState({
        batchRunning: false,
        currentWallet: wallets[currentWalletIndex],
        wallets,
      });

      if (wallets.length > 0) {
        this.setState({
          progress: parametersBatch.numberOfWallets + 1,
          progressMessage: 'Done!',
        });
      }
    } catch (e) {
      this.notyf.error('Error generating wallets!');
    }
  }

  private setCurrentWallet(index: number): void {
    const newIndex = index < 0 ? 0 : index;
    this.setState({ currentWallet: this.state.wallets[newIndex], currentWalletIndex: newIndex });
  }

  private async write() {
    try {
      const { currentWallet, parametersOutput } = this.state;
      if (currentWallet) {
        this.setState({ writing: true });
        this.notyf.success(`Started writing ${parametersOutput.nfc}!`);
        if (parametersOutput.nfc === 'lnurlw' && currentWallet.lnUrlW) {
          await this.lnurlWriter.writeUrl(currentWallet.lnUrlW);
        }
        if (parametersOutput.nfc === 'lnurlp' && currentWallet.lnUrlP) {
          await this.lnurlWriter.writeUrl(currentWallet.lnUrlP);
        }
        this.notyf.success(`${parametersOutput.nfc} written!`);
      } else {
        this.notyf.error('No lnurl available to write!');
      }
    } catch (e: unknown) {
      if (typeof e === 'number' && e in ErrorReason) {
        this.notyf.error(ErrorReason[e]);
      } else {
        this.notyf.error(e instanceof Error ? e.message : (e as string));
      }
    } finally {
      this.setState({ writing: false });
    }
  }
}
