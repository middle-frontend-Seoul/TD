import React, { FC } from 'react';
import cn from 'classnames';

import './block.scss';

export type BlockPage = 'home' | 'play' | 'statistics';

export type BlockType = 'block' | 'inline' | 'flex';

export interface IBlockProps {
  center?: boolean;
  page?: BlockPage;
  type?: BlockType;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  relative?: boolean;
}

export const Block: FC<IBlockProps> = ({
  type = 'block',
  page,
  center,
  className,
  relative,
  children,
  style,
}) => {
  const classes = cn(className, 'block', `block_type-${type}`, {
    relative: Boolean(relative),
    block_center: Boolean(center),
    [`block_page-${page}`]: Boolean(page),
  });

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
