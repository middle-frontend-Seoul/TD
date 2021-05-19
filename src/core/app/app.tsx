import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from 'core/layout';
import { URL } from 'core/url';
import {
  PageHome,
  PagePlay,
  PageForum,
  PageError,
  PageSignIn,
  PageSignUp,
  PageForumSignIn,
  PageForumSignUp,
  PageProfile,
  PageStatistics,
  PageForumDetails,
  PageForumSection,
} from 'pages';
import { ProtectedRoute, ProtectedForumRoute } from 'core/protected-route';
import { useMountEffect } from 'utils/hooks';
import { useBoundAction } from 'rdx/hooks';
import { getCurrentUser } from 'rdx/slices/auth-slice';
import { getCurrentUser as getForumCurrentUser } from 'rdx/slices/auth-forum-slice';

import './app.scss';

const App: FC = () => {
  const actionGetCurrentUser = useBoundAction(getCurrentUser);
  const actionGetForumCurrentUser = useBoundAction(getForumCurrentUser);

  useMountEffect(() => {
    actionGetCurrentUser();
    actionGetForumCurrentUser();
  });

  return (
    <Layout>
      <Switch>
        <ProtectedRoute path={URL.HOME.path} component={PageHome} exact />
        <ProtectedRoute path={URL.PLAY.path} component={PagePlay} />
        <ProtectedForumRoute
          path={URL.FORUM_DETAILS.path}
          component={PageForumDetails}
          exact
        />
        <ProtectedForumRoute
          path={URL.FORUM_SECTION.path}
          component={PageForumSection}
          exact
        />
        <ProtectedForumRoute
          path={URL.FORUM.path}
          component={PageForum}
          exact
        />
        <ProtectedRoute path={URL.PROFILE.path} component={PageProfile} />
        <ProtectedRoute path={URL.STATISTICS.path} component={PageStatistics} />
        <Route path={URL.SIGNIN.path} component={PageSignIn} />
        <Route path={URL.SIGNUP.path} component={PageSignUp} />
        <Route path={URL.SIGNIN_FORUM.path} component={PageForumSignIn} exact />
        <Route path={URL.SIGNUP_FORUM.path} component={PageForumSignUp} exact />
        <Route component={PageError} />
      </Switch>
    </Layout>
  );
};

export { App };
export default App;
