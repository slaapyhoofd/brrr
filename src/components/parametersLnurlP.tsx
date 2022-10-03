import { useState } from 'react';
import { IParametersLnurlP } from '../interfaces';
import { Field } from './field';
import { safeParseInt } from '../util/parse';
import { Checkbox } from './checkbox';

interface IParametersLnurlProps {
  enabled: boolean;
  parameters: IParametersLnurlP;
  updateParameters(parameters: IParametersLnurlP): void;
}

export const ParametersLnurlP = ({
  enabled,
  parameters,
  updateParameters,
}: IParametersLnurlProps) => {
  if (!enabled) {
    return null;
  }

  const { max, min, description, success_text, webhook_url } = parameters;
  const [fixed, setFixed] = useState(false);

  const updateMax = (value: string) => {
    const newMax = safeParseInt(value, 1);
    updateParameters({ ...parameters, max: newMax, min: fixed ? newMax : min });
  };

  return (
    <article>
      <header>Parameter for payments to the card</header>
      <div className="grid">
        <p>How much sats should the wallets be able to receive?</p>
        <Checkbox id="fixed" label="Fixed amount" value={fixed} onChange={(v) => setFixed(v)} />
      </div>
      <div className="grid">
        {fixed ? null : (
          <Field
            id="min_withdrawable"
            label="Min"
            value={min + ''}
            type="number"
            onChange={(v) => updateParameters({ ...parameters, min: safeParseInt(v, 1) })}
          />
        )}
        <Field
          id="max"
          label={fixed ? 'Amount' : 'Max'}
          value={max + ''}
          type="number"
          onChange={(v) => updateMax(v)}
        />
      </div>
      <Field
        id="description"
        label="Message when card is topped up"
        value={description}
        onChange={(v) => updateParameters({ ...parameters, description: v })}
      />
      <p>What to show, after deposit is made ?</p>
      <Field
        id="success_text"
        label="Message <none>"
        required={false}
        value={success_text || ''}
        onChange={(v) => updateParameters({ ...parameters, success_text: v })}
      />
      <Field
        id="webhook_url"
        label="Url <none>"
        required={false}
        value={webhook_url || ''}
        onChange={(v) => updateParameters({ ...parameters, webhook_url: v })}
      />
    </article>
  );
};
