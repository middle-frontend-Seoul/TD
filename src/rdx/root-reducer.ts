import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import authReducer from 'rdx/slices/auth-slice';
import forumReducer from 'rdx/slices/forum-slice';
import leaderboardReducer from 'rdx/slices/leaderboard-slice';
import userReducer from 'rdx/slices/user-slice';

export default (history: History) =>
  combineReducers({
    auth: authReducer,
    forum: forumReducer,
    leaderboard: leaderboardReducer,
    user: userReducer,
    router: connectRouter(history),
  });
