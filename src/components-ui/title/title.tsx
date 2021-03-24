import React, { FC, CSSProperties } from 'react';
import cn from 'classnames';

import './title.scss';

export type TitleSize = 'medium';

export interface ITitleProps {
  size?: TitleSize;
  style?: CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export const Title: FC<ITitleProps> = ({
  className,
  children,
  style,
  size = 'medium',
}) => {
  const classes = cn(className, 'title', `title_size-${size}`);
  return (
    <h1 className={classes} style={style}>
      {children}
    </h1>
  );
};
