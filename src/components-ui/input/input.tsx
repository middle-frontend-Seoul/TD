import React, { FC } from 'react';
import cn from 'classnames';

import './input.scss';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps {
  size?: InputSize;
  value: string;
  onChange: () => void;
  placeholder?: string;
}

export const Input: FC<InputProps> = ({
  size = 'medium',
  placeholder = '',
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
      setLabelStyle('');
    }
  };

  const handleClick = () => {
    if (inputStyle === 'hidden') {
      setInputStyle(`visible`);
      if (placeholder === '') setLabelStyle(`top`);
      else setLabelStyle(`hidden`);
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') setLabelStyle(`top`);
    else if (placeholder === '') setLabelStyle(`top`);
    else setLabelStyle(`hidden`);

    onChange();
  };

  React.useEffect(() => inputEl?.current?.focus(), [inputStyle]);

  return (
    <div
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
      className={cn('input-field', size)}
      onClick={handleClick}
    >
      <div className={cn('defaultValue', labelStyle, size)}>{placeholder}</div>
      <input
        className={cn(inputStyle, size)}
        value={value}
        onBlur={handleLeave}
        onChange={onChangeInput.bind(this)}
        ref={inputEl}
        placeholder={placeholder}
      />
    </div>
  );
};
