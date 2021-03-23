import React, { FC } from 'react';
import { Link as RRLink, LinkProps } from 'react-router-dom';
import cn from 'classnames';

import './link.scss';

export const Link: FC<LinkProps> = ({ className, to, children }) => {
  const classes = cn(className, 'link');
  return (
    <RRLink className={classes} to={to}>
      {children}
    </RRLink>
  );
};
