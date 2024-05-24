import * as React from 'react';

export interface IFieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange(value: string): void;
}

export const Field = ({
  id,
  label,
  onChange,
  required = true,
  type = 'text',
  value,
}: IFieldProps): JSX.Element => (
  <label htmlFor={id}>
    {label + (required ? ' *' : '')}
    <input
      type={type}
      id={id}
      name={id}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      required={required}
      autoComplete="off"
    />
  </label>
);
