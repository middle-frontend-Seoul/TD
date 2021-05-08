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
  PageProfile,
  PageStatistics,
  PageForumDetails,
  PageForumSection,
} from 'pages';
import { ProtectedRoute } from 'core/protected-route';
import { useMountEffect } from 'utils/hooks';
import { useBoundAction } from 'rdx/hooks';
import { getCurrentUser } from 'rdx/slices/auth-slice';

import './app.scss';

const App: FC = () => {
  const actionGetCurrentUser = useBoundAction(getCurrentUser);

  useMountEffect(() => {
    actionGetCurrentUser();
  });

  return (
    <Layout>
      <Switch>
        <ProtectedRoute path={URL.HOME.path} component={PageHome} exact />
        <ProtectedRoute path={URL.PLAY.path} component={PagePlay} />
        <ProtectedRoute
          path={URL.FORUM_DETAILS.path}
          component={PageForumDetails}
        />
        <ProtectedRoute
          path={URL.FORUM_SECTION.path}
          component={PageForumSection}
        />
        <ProtectedRoute path={URL.FORUM.path} component={PageForum} />
        <ProtectedRoute path={URL.PROFILE.path} component={PageProfile} />
        <ProtectedRoute path={URL.STATISTICS.path} component={PageStatistics} />
        <Route path={URL.SIGNIN.path} component={PageSignIn} />
        <Route path={URL.SIGNUP.path} component={PageSignUp} />
        <Route component={PageError} />
      </Switch>
    </Layout>
  );
};

export { App };
export default App;
