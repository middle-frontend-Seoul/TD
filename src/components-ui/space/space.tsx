import React, { FC } from 'react';
import cn from 'classnames';

import './space.scss';

export type SpaceType = 'horizontal' | 'vertikale';

export type SpaceSize = 'medium';

export interface IBlockProps {
  size?: SpaceSize;
  type?: SpaceType;
  position?: 'center';
  className?: string;
  children: React.ReactNode;
}

export const Space: FC<IBlockProps> = ({
  type = 'vertikale',
  size = 'medium',
  position,
  className,
  children,
}) => {
  const classes = cn(className, 'space', `space_type-${type}`, {
    'space_position-center': !!position,
  });

  const childs = React.Children.toArray(children)
    .map((child, i) => {
      if (!React.isValidElement(child)) {
        return false;
      }

      return React.cloneElement(child, {
        key: String(i),
        className: `space__${type}_size-${size}`,
      });
    })
    .filter(Boolean);

  return <div className={classes}>{childs}</div>;
};
