import React, { FC, ChangeEvent, useState, useRef } from 'react';
import cn from 'classnames';

import './input.scss';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps {
  size?: InputSize;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  name: string;
  type: string | undefined;
}

export const Input: FC<InputProps> = ({
  size = 'medium',
  placeholder = '',
  value,
  onChange,
  name,
  id,
  type = 'text',
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [labelStyle, setLabelStyle] = useState<string>('default');
  const inputEl = useRef<HTMLInputElement>(null);
  const handleLeave = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!value) {
      setIsHidden(true);
      setLabelStyle('');
    }
  };
  const handleClick = () => {
    if (isHidden) {
      setIsHidden(false);
      if (placeholder === '') {
        setLabelStyle(`top`);
      } else {
        setLabelStyle(`hidden`);
      }
    }
  };
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '' || !placeholder) {
      setLabelStyle(`top`);
    } else {
      setLabelStyle(`hidden`);
    }
    onChange(event);
  };
  React.useEffect(() => {
    inputEl?.current?.focus();
  }, [isHidden]);
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
        className={cn({ hidden: isHidden }, size)}
        value={value}
        onBlur={handleLeave}
        onChange={onChangeInput}
        ref={inputEl}
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
      />
    </div>
  );
};
