import React, { FC } from 'react';
import cn from 'classnames';

import './avatar.scss';

export interface IAvatarProps {
  className?: string;
  src: string;
  size: number;
}

export const Avatar: FC<IAvatarProps> = ({ className, src, size }) => {
  const classes = cn(className, 'avatar');
  return (
    <div className={classes}>
      <img
        className="avatar__image"
        src={src}
        alt="avatar"
        width={size}
        height={size}
        style={{ borderRadius: `${size / 2}px` }}
      />
    </div>
  );
};
