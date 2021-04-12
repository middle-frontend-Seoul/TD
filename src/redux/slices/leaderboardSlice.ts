import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { leaderboardApi } from 'api/leaderboard-api';

type LeaderboardState = {
  data?: LeaderboardInfo[];
  isLoading: boolean;
  error?: HttpError;
};

const initialState: LeaderboardState = {
  isLoading: false,
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    fulfilled: (
      state,
      action: PayloadAction<LeaderboardInfo[] | undefined>
    ) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    rejected: (state, action: PayloadAction<HttpError>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { pending, fulfilled, rejected } = leaderboardSlice.actions;

export function getAllLeaderboards(arg: LeaderboardRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(pending());
    const { data, error } = await leaderboardApi.getAllLeaderboards(arg);
    if (!error) {
      dispatch(fulfilled(data));
    } else {
      dispatch(rejected(error));
    }
  };
}

export default leaderboardSlice.reducer;
