import { combineReducers } from '@reduxjs/toolkit';

import authReducer from 'redux/slices/authSlice';
import leaderboardReducer from 'redux/slices/leaderboardSlice';
import userReducer from 'redux/slices/userSlice';

export default combineReducers({
  auth: authReducer,
  leaderboard: leaderboardReducer,
  user: userReducer,
});
