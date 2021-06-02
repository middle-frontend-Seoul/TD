import React, { FC, useEffect } from 'react';
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
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { getCurrentUser } from 'rdx/slices/auth-slice';
import { getTheme } from 'rdx/slices/user-slice';
import terrainBackground from './terrain.png';
import concreteBackground from './concrete.png';

import './app.scss';

const App: FC = () => {
  const actionGetCurrentUser = useBoundAction(getCurrentUser);
  const actionGetTheme = useBoundAction(getTheme);

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const colorTheme = useAppSelector((state) => state.user.theme);

  useMountEffect(() => {
    actionGetCurrentUser();
  });

  useEffect(() => {
    if (currentUser?.id) {
      actionGetTheme(currentUser.id);
    }
    switch (colorTheme) {
      case 'default': {
        document.body.style.backgroundImage = `url(${terrainBackground})`;
        break;
      }
      case 'alternative': {
        document.body.style.backgroundImage = `url(${concreteBackground})`;
        break;
      }
      default: {
        document.body.style.backgroundImage = `url(${terrainBackground})`;
      }
    }
  }, [currentUser, actionGetTheme, colorTheme]);

  return (
    <Layout>
      <Switch>
        <ProtectedRoute path={URL.HOME.path} component={PageHome} exact />
        <ProtectedRoute path={URL.PLAY.path} component={PagePlay} />
        <ProtectedRoute
          path={URL.FORUM_DETAILS.path}
          component={PageForumDetails}
          exact
        />
        <ProtectedRoute
          path={URL.FORUM_SECTION.path}
          component={PageForumSection}
          exact
        />
        <ProtectedRoute path={URL.FORUM.path} component={PageForum} exact />
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
