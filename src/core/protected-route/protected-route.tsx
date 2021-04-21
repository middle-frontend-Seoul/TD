import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import * as URL from 'core/url';
import { useAppSelector } from 'redux/hooks';

const ProtectedRoute: FC<RouteProps> = (routeProps) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return currentUser ? (
    <Route {...routeProps} /> // eslint-disable-line
  ) : (
    <Redirect
      to={{ pathname: URL.SIGNIN, state: { from: routeProps.location } }}
    />
  );
};

export { ProtectedRoute };
