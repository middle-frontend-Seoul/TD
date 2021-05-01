import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import userReducer from 'rdx/slices/user-slice';
import authReducer from 'rdx/slices/auth-slice';
import forumReducer from 'rdx/slices/forum-slice';
import leaderboardReducer from 'rdx/slices/leaderboard-slice';

export default (history: History) =>
  combineReducers({
    auth: authReducer,
    leaderboard: leaderboardReducer,
    user: userReducer,
    forum: forumReducer,
    router: connectRouter(history),
  });
