import * as React from 'react';
import { IParametersLnurl } from '../interfaces';
import { Field } from './field';
import { safeParseInt } from '../util/parse';

interface IParametersLnurlProps {
  parameters: IParametersLnurl;
  updateParameters(parameters: IParametersLnurl): void;
}

export const ParametersLnurl = ({ parameters, updateParameters }: IParametersLnurlProps) => {
  const { max_withdrawable, min_withdrawable, title, uses, wait_time, webhook_url } = parameters;
  return (
    <article>
      <header>Card parameters</header>
      <Field
        id="title"
        label="Message when paying with the card"
        value={title}
        onChange={(v) => updateParameters({ ...parameters, title: v })}
      />
      <div className="grid">
        <div>
          <Field
            id="min_withdrawable"
            label="Min withdrawable (sat, at least 10)"
            value={min_withdrawable + ''}
            onChange={(v) =>
              updateParameters({ ...parameters, min_withdrawable: safeParseInt(v, 10) })
            }
          />
          <Field
            id="max_withdrawable"
            label="Max withdrawable (sat, at least 10)"
            value={max_withdrawable + ''}
            onChange={(v) =>
              updateParameters({ ...parameters, max_withdrawable: safeParseInt(v, 10) })
            }
          />
        </div>
        <div>
          <Field
            id="uses"
            label="Amount of uses"
            value={uses + ''}
            onChange={(v) => updateParameters({ ...parameters, uses: safeParseInt(v, 1) })}
          />
          <Field
            id="wait_time"
            label="Time between withdrawals (in seconds)"
            value={wait_time + ''}
            onChange={(v) => updateParameters({ ...parameters, wait_time: safeParseInt(v, 10) })}
          />
        </div>
      </div>
      <Field
        id="webhook_url"
        label="Url to be redirected to after payment"
        required={false}
        value={webhook_url || ''}
        onChange={(v) => updateParameters({ ...parameters, webhook_url: v })}
      />
    </article>
  );
};
