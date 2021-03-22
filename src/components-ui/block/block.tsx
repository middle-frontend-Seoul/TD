import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import './block.scss';

export type BlockType = 'block' | 'inline';

export interface IBlockProps extends HTMLAttributes<HTMLDivElement> {
  type?: BlockType;
  children: React.ReactNode;
}

export const Block: FC<IBlockProps> = ({
  type = 'block',
  className,
  children,
  ...props
}) => {
  const classes = cn(className, 'block', `block_type-${type}`);
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
