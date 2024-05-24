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

  const { amount, memo } = parameters;
  return (
    <article>
      <header>Parameter for funding your cards with sats</header>
      <Field
        id="amount"
        label="Amount of sats per card"
        value={amount + ''}
        type="number"
        onChange={(v) => updateParameters({ ...parameters, amount: safeParseInt(v, 1, 21000000) })}
      />
      <Field
        id="memo"
        label="Message for funding transaction"
        required={false}
        value={memo || ''}
        onChange={(v) => updateParameters({ ...parameters, memo: v })}
      />
    </article>
  );
};
