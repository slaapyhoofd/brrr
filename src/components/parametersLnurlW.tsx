import { IParametersLnurlW } from '../interfaces';
import { Field } from './field';
import { safeParseInt } from '../util/parse';

interface IParametersLnurlProps {
  enabled: boolean;
  parameters: IParametersLnurlW;
  updateParameters(parameters: IParametersLnurlW): void;
}

export const ParametersLnurlW = ({
  enabled,
  parameters,
  updateParameters,
}: IParametersLnurlProps) => {
  if (!enabled) {
    return null;
  }

  const { max_withdrawable, min_withdrawable, title, uses, wait_time, webhook_url } = parameters;
  return (
    <article>
      <header>Parameter for paying with the cards</header>
      <Field
        id="title"
        label="Message on payment"
        value={title}
        onChange={(v) => updateParameters({ ...parameters, title: v })}
      />
      <div className="grid">
        <div>
          <Field
            id="min_withdrawable"
            label="Min withdrawable (sat, at least 10)"
            required={true}
            value={min_withdrawable + ''}
            type="number"
            onChange={(v) =>
              updateParameters({ ...parameters, min_withdrawable: safeParseInt(v, 10) })
            }
          />
          <Field
            id="uses"
            label="Amount of uses"
            value={uses + ''}
            type="number"
            onChange={(v) => updateParameters({ ...parameters, uses: safeParseInt(v, 100) })}
          />
        </div>
        <div>
          <Field
            id="max_withdrawable"
            label="Max withdrawable (sats)"
            value={max_withdrawable + ''}
            type="number"
            onChange={(v) =>
              updateParameters({ ...parameters, max_withdrawable: safeParseInt(v, 10000) })
            }
          />
          <Field
            id="wait_time"
            label="Time between withdrawals (in seconds)"
            value={wait_time + ''}
            type="number"
            onChange={(v) => updateParameters({ ...parameters, wait_time: safeParseInt(v, 10) })}
          />
        </div>
      </div>
      <Field
        id="webhook_url"
        label="Url to be redirected to on payments"
        required={false}
        value={webhook_url || ''}
        onChange={(v) => updateParameters({ ...parameters, webhook_url: v })}
      />
    </article>
  );
};
