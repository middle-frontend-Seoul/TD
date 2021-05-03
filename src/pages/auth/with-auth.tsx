import React, { FC } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import * as URL from 'core/url';
import { useAppSelector } from 'rdx/hooks';

export function withAuth<P>(WrappedComponent: FC<P>): FC<P> {
  return (props: P) => {
    const location = useLocation<LocationState>();
    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const fromUrl = location.state?.from
      ? location.state.from.pathname + location.state.from.search
      : undefined;

    if (currentUser) {
      return <Redirect to={fromUrl || URL.HOME} />;
    }

    return <WrappedComponent {...props} />; // eslint-disable-line
  };
}
