import * as React from 'react';
import { IParametersLnurlP } from '../interfaces';
import { Field } from './field';
import { safeParseInt } from '../util/parse';

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

  const { max, min, description, success_url, success_text, webhook_url } = parameters;
  return (
    <article>
      <header>Parameters for topping op the card</header>
      <Field
        id="description"
        label="Message when card is topped up"
        value={description}
        onChange={(v) => updateParameters({ ...parameters, description: v })}
      />
      <p>How much sats should the wallets be able to receive?</p>
      <div className="grid">
        <Field
          id="min_withdrawable"
          label="Min"
          value={min + ''}
          onChange={(v) => updateParameters({ ...parameters, min: safeParseInt(v, 1) })}
        />
        <Field
          id="max"
          label="Max"
          value={max + ''}
          onChange={(v) => updateParameters({ ...parameters, max: safeParseInt(v, 1) })}
        />
      </div>

      <Field
        id="success_text"
        label="Message to show after deposit is made"
        required={false}
        value={success_text || ''}
        onChange={(v) => updateParameters({ ...parameters, success_text: v })}
      />
      <Field
        id="success_url"
        label="Url to be redirected to after deposit is made"
        required={false}
        value={success_url || ''}
        onChange={(v) => updateParameters({ ...parameters, success_url: v })}
      />
      <Field
        id="webhook_url"
        label="Url to be redirected to after deposit is made"
        required={false}
        value={webhook_url || ''}
        onChange={(v) => updateParameters({ ...parameters, webhook_url: v })}
      />
    </article>
  );
};
