import React, { FC, ChangeEvent, useRef, useEffect } from 'react';
import cn from 'classnames';

import './field-profile.scss';

export interface IFieldProfileProps {
  className?: string;
  label: string;
  name: string;
  type: string;
  focus?: boolean;
  value?: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
}

export const FieldProfile: FC<IFieldProfileProps> = ({
  className,
  label,
  name,
  type,
  value,
  focus = false,
  onChange,
  disabled,
  error,
}) => {
  const classes = cn(className, 'field-profile');

  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl.current && focus) {
      inputEl.current.focus();
    }
  }, [inputEl, focus]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className={classes}>
      <div className="field-profile__label">
        <label htmlFor={name}>{label}</label>
        {error ? <span className="field-profile__error">{error}</span> : null}
      </div>
      <input
        className="field-profile__input"
        ref={inputEl}
        type={type}
        name={name}
        id={name}
        value={value || ''}
        disabled={disabled}
        onChange={onChangeInput}
      />
    </div>
  );
};
