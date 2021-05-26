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
}

export const Input: FC<InputProps> = ({
  // size = 'medium',
  placeholder = '',
  value,
  error,
  onChange,
  name,
  id,
  type = 'text',
}) => {
  return (
    <div className="input-field">
      <input
        className={cn('input', 'field-input', {
          'field-input_error': error,
        })}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
      />
      <label htmlFor={name} className="field-label">
        {placeholder}
      </label>
    </div>
  );
};
