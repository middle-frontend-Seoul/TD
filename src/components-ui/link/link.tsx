import React, { FC } from 'react';
import { Link as RRLink, LinkProps } from 'react-router-dom';
import cn from 'classnames';

import './link.scss';

type LinkType = 'link' | 'button';

export interface ILinkProps {
  type?: LinkType;
}

export const Link: FC<LinkProps> = ({
  type = 'link',
  to,
  className,
  children,
}) => {
  const classes = cn(className, 'link', `link_type-${type}`);
  return (
    <RRLink className={classes} to={to}>
      {children}
    </RRLink>
  );
};
