import React, { FC } from 'react';
import cn from 'classnames';

import './space.scss';

export type SpaceType = 'horizontal' | 'vertical';

export type SpaceSize = 'medium';

export interface IBlockProps {
  size?: SpaceSize;
  type?: SpaceType;
  position?: 'center';
  className?: string;
  children: React.ReactNode;
}

export const Space: FC<IBlockProps> = ({
  type = 'vertical',
  size = 'medium',
  position,
  className,
  children,
}) => {
  const classes = cn(className, 'space', `space_type-${type}`, {
    position: Boolean(position),
  });

  const childs = React.useMemo(() => {
    return React.Children.toArray(children)
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
  }, [children, type, size]);

  return <div className={classes}>{childs}</div>;
};
