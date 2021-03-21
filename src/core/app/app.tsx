import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as URL from 'core/url';
import {
  PageHome,
  PagePlay,
  PageForum,
  PageError,
  PageSignin,
  PageSignup,
  PageProfile,
  PageStatistics,
  PageForumDetails,
  PageForumSection,
} from 'pages';

import './app.scss';

const App: FC = () => (
  <Router>
    <Switch>
      <Route path={URL.HOME} exact component={PageHome} />
      <Route path={URL.PLAY} component={PagePlay} />
      <Route path={URL.FORUM} component={PageForum} />
      <Route path={URL.FORUM_SECTION} component={PageForumDetails} />
      <Route path={URL.FORUM_DETAILS} component={PageForumSection} />
      <Route path={URL.SIGNIN} component={PageSignin} />
      <Route path={URL.SIGNUP} component={PageSignup} />
      <Route path={URL.PROFILE} component={PageProfile} />
      <Route path={URL.STATISTICS} component={PageStatistics} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export { App };
export default App;
