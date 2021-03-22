import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import './title.scss';

export type TitleSize = 'medium';

export interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: TitleSize;
  children: React.ReactNode;
}

export const Title: FC<ITitleProps> = ({
  className,
  children,
  size = 'medium',
  ...props
}) => {
  const classes = cn(className, 'title', `title_size-${size}`);
  return (
    <h1 className={classes} {...props}>
      {children}
    </h1>
  );
};
