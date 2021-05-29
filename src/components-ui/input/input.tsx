import React, { FC, ChangeEvent } from 'react';
import cn from 'classnames';

import './input.scss';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps {
  size?: InputSize;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  error?: string;
  name: string;
  type: string | undefined;
  autoFocus?: boolean;
}

export const Input: FC<InputProps> = ({
  size = 'medium',
  placeholder = '',
  value,
  error,
  onChange,
  name,
  id,
  type = 'text',
  autoFocus,
}) => {
  return (
    <div
      className={cn('input-field', `input-field_${size}`, { error: !!error })}
    >
      <input style={{ display: 'none' }} />
      <input
        className={cn('input', `input_${size}`, 'input-field__input', {
          'input-field__input_error': error,
        })}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
        autoFocus={autoFocus} // eslint-disable-line
      />
      <label
        htmlFor={name}
        className={cn('input-field__label', `input-field__label_${size}`)}
      >
        {placeholder}
      </label>
    </div>
  );
};
