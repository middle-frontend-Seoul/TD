import React, { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import './button.scss';

export type ButtonUse = 'default' | 'primary';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  radius?: boolean;
  data?: unknown;
  use?: ButtonUse;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: (data?: unknown) => void;
  children: React.ReactNode;
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  disabled,
  onClick,
  data,
  radius,
  size = 'medium',
  type = 'button',
  use = 'default',
  ...props
}) => {
  // method
  // ---------------
  const handleOnClick = () => {
    if (disabled) return;
    onClick?.(data);
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
    <button type={type} className={classes} onClick={handleOnClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
