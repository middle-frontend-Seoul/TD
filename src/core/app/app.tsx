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

import './app.scss';

const App: FC = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path={URL.HOME} component={PageHome} exact />
        <Route path={URL.PLAY} component={PagePlay} />
        <Route path={URL.FORUM_DETAILS} component={PageForumDetails} />
        <Route path={URL.FORUM_SECTION} component={PageForumSection} />
        <Route path={URL.FORUM} component={PageForum} />
        <Route path={URL.SIGNIN} component={PageSignIn} />
        <Route path={URL.SIGNUP} component={PageSignUp} />
        <Route path={URL.PROFILE} component={PageProfile} />
        <Route path={URL.STATISTICS} component={PageStatistics} />
        <Route component={PageError} />
      </Switch>
    </Layout>
  </Router>
);

export { App };
export default App;
