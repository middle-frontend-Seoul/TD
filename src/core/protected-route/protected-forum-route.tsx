import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { URL } from 'core/url';
import { useAppSelector } from 'rdx/hooks';

const ProtectedForumRoute: FC<RouteProps> = (routeProps) => {
  const currentForumUser = useAppSelector(
    (state) => state.authForum.currentUser
  );
  const { location } = routeProps;

  return currentForumUser ? (
    <Route {...routeProps} /> // eslint-disable-line
  ) : (
    <Redirect
      to={{ pathname: URL.SIGNIN_FORUM.path, state: { from: location } }}
    />
  );
};

export { ProtectedForumRoute };
