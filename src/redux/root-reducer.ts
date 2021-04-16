import { combineReducers } from '@reduxjs/toolkit';

import userReducer from 'redux/slices/user-slice';
import authReducer from 'redux/slices/auth-slice';
import forumReducer from 'redux/slices/forum-slice';
import leaderboardReducer from 'redux/slices/leaderboard-slice';

export default combineReducers({
  auth: authReducer,
  leaderboard: leaderboardReducer,
  user: userReducer,
  forum: forumReducer,
});
