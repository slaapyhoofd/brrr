import { IParametersInvoice } from '../interfaces';
import { Field } from './field';
import { safeParseInt } from '../util/parse';

interface IParametersLnurlProps {
  enabled: boolean;
  parameters: IParametersInvoice;
  updateParameters(parameters: IParametersInvoice): void;
}

export const ParametersInvoice = ({
  enabled,
  parameters,
  updateParameters,
}: IParametersLnurlProps) => {
  if (!enabled) {
    return null;
  }

  const { amount, memo, webhook } = parameters;
  return (
    <article>
      <header>Parameters for filling up the cards with sats</header>
      <Field
        id="amount"
        label="How much sat do you want put on the card"
        value={amount + ''}
        type="number"
        onChange={(v) => updateParameters({ ...parameters, amount: safeParseInt(v, 1) })}
      />
      <Field
        id="memo"
        label="Leave a fill-up message for the user"
        required={false}
        value={memo || ''}
        onChange={(v) => updateParameters({ ...parameters, memo: v })}
      />
      <Field
        id="webhook_url"
        label="Url to trigger to after invoice is paid"
        required={false}
        value={webhook || ''}
        onChange={(v) => updateParameters({ ...parameters, webhook: v })}
      />
    </article>
  );
};
