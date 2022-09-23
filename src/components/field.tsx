import * as React from 'react';

export interface IFieldProps {
  id: string;
  label: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  onChange(value: string): void;
}

export const Field = ({ id, label, onChange, value, type = 'text' }: IFieldProps): JSX.Element => (
  <label htmlFor={id}>
    {label}
    <input
      type={type}
      id={id}
      name={id}
      placeholder={label}
      defaultValue={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      required
    />
  </label>
);
