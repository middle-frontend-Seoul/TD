import React, { FC, ReactNode, CSSProperties } from 'react';
import cn from 'classnames';

import './button.scss';

export type ButtonUse = 'default' | 'primary';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  radius?: boolean;
  use?: ButtonUse;
  size?: ButtonSize;
  icon?: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  disabled,
  onClick,
  radius,
  style,
  size = 'medium',
  type = 'button',
  use = 'default',
}) => {
  // method
  // ---------------
  const handleOnClick = () => {
    if (disabled) return;
    onClick?.();
  };

  // render
  // ---------------
  const classes = cn(
    className,
    'button',
    `button_use-${use}`,
    `button_size-${size}`,
    {
      [`button_radius-${size}`]: !!radius,
    }
  );

  return (
    <button
      type={type}
      style={style}
      className={classes}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
