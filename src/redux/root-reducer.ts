import { combineReducers } from '@reduxjs/toolkit';

import authReducer from 'redux/slices/auth-slice';
import leaderboardReducer from 'redux/slices/leaderboard-slice';
import userReducer from 'redux/slices/user-slice';

export default combineReducers({
  auth: authReducer,
  leaderboard: leaderboardReducer,
  user: userReducer,
});
