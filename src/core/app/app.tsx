import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from 'core/layout';
import * as URL from 'core/url';
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
import { useBoundAction } from 'redux/hooks';
import { getCurrentUser } from 'redux/slices/auth-slice';

import './app.scss';

const App: FC = () => {
  const actionGetCurrentUser = useBoundAction(getCurrentUser);

  useMountEffect(() => {
    actionGetCurrentUser();
  });

  return (
    <Router>
      <Layout>
        <Switch>
          <ProtectedRoute path={URL.HOME} component={PageHome} exact />
          <ProtectedRoute path={URL.PLAY} component={PagePlay} />
          <ProtectedRoute
            path={URL.FORUM_DETAILS}
            component={PageForumDetails}
          />
          <ProtectedRoute
            path={URL.FORUM_SECTION}
            component={PageForumSection}
          />
          <ProtectedRoute path={URL.FORUM} component={PageForum} />
          <ProtectedRoute path={URL.PROFILE} component={PageProfile} />
          <ProtectedRoute path={URL.STATISTICS} component={PageStatistics} />
          <Route path={URL.SIGNIN} component={PageSignIn} />
          <Route path={URL.SIGNUP} component={PageSignUp} />
          <Route component={PageError} />
        </Switch>
      </Layout>
    </Router>
  );
};

export { App };
export default App;
