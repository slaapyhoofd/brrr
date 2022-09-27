import { IParametersBatch, IWalletInfo } from '../interfaces';
import { Field } from './field';
import { FileUpload } from './upload';
import { FileDownload } from './download';
import { safeParseInt } from '../util/parse';
import { Checkbox } from './checkbox';
import { Progress } from './progress';

interface IParametersBatchProps {
  parameters: IParametersBatch;
  progress: number;
  progressMessage?: string;
  wallets: IWalletInfo[];

  brrr(): void;
  updateParameters(parameters: IParametersBatch): void;
  updateWallets(wallets: IWalletInfo[]): void;
}

export const ParametersBatch = ({
  parameters,
  progress,
  progressMessage,
  wallets,
  brrr,
  updateParameters,
  updateWallets,
}: IParametersBatchProps) => {
  const {
    adminId,
    baseUrl,
    namePrefix,
    lndHubEnabled,
    lnurlPEnabled,
    lnurlWEnabled,
    numberOfWallets,
    readKey,
  } = parameters;

  return (
    <article>
      <header>Let´s Brrr some cards !</header>
      <div className="grid">
        <div>
          <Field
            id="baseUrl"
            label="My LNBits url"
            value={baseUrl}
            onChange={(v) => updateParameters({ ...parameters, baseUrl: v })}
          />
          <Field
            id="adminId"
            label="LNBits admin-id"
            value={adminId || ''}
            onChange={(v) => updateParameters({ ...parameters, adminId: v })}
          />
          <Field
            id="readKey"
            label="LNBits read-key"
            value={readKey || ''}
            onChange={(v) => updateParameters({ ...parameters, readKey: v })}
          />
        </div>
        <div>
          <Field
            id="namePrefix"
            label="Name prefix"
            value={namePrefix}
            onChange={(v) => updateParameters({ ...parameters, namePrefix: v })}
          />
          <Field
            id="numberOfWallets"
            label="Amount of cards"
            value={numberOfWallets + ''}
            type="number"
            onChange={(v) =>
              updateParameters({ ...parameters, numberOfWallets: safeParseInt(v, 1, 1000) })
            }
          />
          <FileUpload id="upload" label="Upload wallets" onUpload={(d) => updateWallets(d)} />
        </div>
      </div>
      <p>Which data do you need? A link per card to ..</p>
      <Checkbox
        id="lnurlWEnabled"
        label="pay with it (LNURLw)"
        value={lnurlWEnabled}
        onChange={(v) => updateParameters({ ...parameters, lnurlWEnabled: v })}
      />
      <Checkbox
        id="lnurlPEnabled"
        label="top it up (LNURLp)"
        value={lnurlPEnabled}
        onChange={(v) => updateParameters({ ...parameters, lnurlPEnabled: v })}
      />
      <Checkbox
        id="lndHubEnabled"
        label="import it (e.g. to BlueWallet)"
        value={lndHubEnabled}
        onChange={(v) => updateParameters({ ...parameters, lndHubEnabled: v })}
      />
      <Progress value={progress} max={numberOfWallets + 1} message={progressMessage} />
      <footer>
        <div className="grid">
          <FileDownload
            fileName="wallets"
            caption="Download wallets"
            data={wallets}
            disabled={wallets.length === 0}
          />
          <button id="brrr" onClick={() => brrr()}>
            Wallets Brrr...
          </button>
        </div>
      </footer>
    </article>
  );
};
