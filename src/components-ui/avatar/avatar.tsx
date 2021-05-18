import React, { FC, ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

import errorAvatar from './images/error-avatar.png';
import './avatar.scss';

export interface IAvatarProps {
  className?: string;
  src: string;
  size: number;
  children?: ReactNode;
}

export const Avatar: FC<IAvatarProps> = ({
  className,
  src,
  size,
  children,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const classes = cn(className, 'avatar');

  useEffect(() => {
    const getImage = async () => {
      try {
        const result = await fetch(src);
        if (result.status !== 200) {
          throw new Error('cannot get image');
        }
      } catch {
        setImageSrc(errorAvatar);
      }
    };
    getImage();
  }, [src]);

  return (
    <div className={classes}>
      <img
        className="avatar__image"
        src={imageSrc}
        alt="avatar"
        width={size}
        height={size}
        style={{ borderRadius: `${size / 2}px` }}
      />
      {children}
    </div>
  );
};
