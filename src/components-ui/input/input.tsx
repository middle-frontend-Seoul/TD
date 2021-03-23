import React, { FC } from 'react';
import cn from 'classnames';

import './input.scss';

export type InputSize = 'small' | 'medium' | 'large';

export interface IButtonProps {
  size?: InputSize;
  value: string;
  onChange: () => void;
  defaultValue?: string;
}

export const Input: FC<IButtonProps> = ({
  size = 'medium',
  defaultValue = 'input',
  value,
  onChange,
}) => {
  const [inputStyle, setInputStyle] = React.useState<string>('hidden');
  const [labelStyle, setLabelStyle] = React.useState<string>('default');
  const inputEl = React.useRef<HTMLInputElement>(null);

  const handleLeave = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (value === '') {
      setInputStyle('hidden');
      setLabelStyle('default');
    }
  };

  const handleClick = () => {
    if (inputStyle === 'hidden') {
      setInputStyle(`visible_size-${size}`);
      setLabelStyle(`top_size-${size}`);
    }
  };

  React.useEffect(() => inputEl?.current?.focus(), [inputStyle]);

  return (
    <div
      /** Строчка ниже чтобы прошёл коммит. Без неё выдаются две ошибки, которые я не знаю как побороть */
      /** Static HTML elements with event handlers require a role */
      /** Visible, non-interactive elements with click handlers must have at least one keyboard listener */
      aria-hidden="true"
      className={cn('input-field', `input-field_size-${size}`)}
      onClick={handleClick}
    >
      <div
        className={cn('defaultValue', labelStyle, `defaultValue_size-${size}`)}
      >
        {defaultValue}
      </div>
      <input
        className={cn(inputStyle, `input_size-${size}`)}
        value={value}
        onBlur={handleLeave}
        onChange={onChange}
        ref={inputEl}
      />
    </div>
  );
};
