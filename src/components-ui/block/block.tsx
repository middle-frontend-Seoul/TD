import React, { FC } from 'react';
import cn from 'classnames';

import './block.scss';

export type BlockPage = 'home' | 'forum';

export type BlockType = 'block' | 'inline' | 'flex';

export interface IBlockProps {
  title?: string;
  center?: boolean;
  page?: BlockPage;
  type?: BlockType;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Block: FC<IBlockProps> = ({
  type = 'block',
  page,
  title,
  center,
  className,
  children,
  style,
}) => {
  const classes = cn(className, 'block', `block_type-${type}`, {
    block_center: Boolean(center),
    [`block_page-${page}`]: Boolean(page),
  });

  return (
    <div className={classes} style={style}>
      {title && <div className="block_title">{title}</div>}
      {children}
    </div>
  );
};
