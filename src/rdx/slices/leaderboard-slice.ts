import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { leaderboardApi } from 'api/leaderboard-api';
import { formatError, formatHttpError } from 'utils/format';

export type LeaderboardState = {
  data?: LeaderboardInfo[];
  loadingStatus: StateStatus;
  mutatingStatus: StateStatus;
  error?: SerializedError;
};

export const initialState: LeaderboardState = {
  loadingStatus: 'idle',
  mutatingStatus: 'idle',
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    getAllLeaderboardsPending: (state) => {
      state.loadingStatus = 'pending';
    },
    getAllLeaderboardsSuccess: (
      state,
      action: PayloadAction<LeaderboardInfo[] | undefined>
    ) => {
      state.loadingStatus = 'success';
      state.data = action.payload;
    },
    getAllLeaderboardsFailure: (
      state,
      action: PayloadAction<SerializedError>
    ) => {
      state.loadingStatus = 'failure';
      state.error = action.payload;
    },

    addLeaderboardItemPending: (state) => {
      state.mutatingStatus = 'pending';
    },
    addLeaderboardItemSuccess: (state) => {
      state.mutatingStatus = 'success';
    },
    addLeaderboardItemFailure: (
      state,
      action: PayloadAction<SerializedError>
    ) => {
      state.mutatingStatus = 'failure';
      state.error = action.payload;
    },
  },
});

const {
  getAllLeaderboardsPending,
  getAllLeaderboardsSuccess,
  getAllLeaderboardsFailure,

  addLeaderboardItemPending,
  addLeaderboardItemSuccess,
  addLeaderboardItemFailure,
} = leaderboardSlice.actions;

export function getAllLeaderboards(arg: LeaderboardRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(getAllLeaderboardsPending());
    try {
      const { data, error } = await leaderboardApi.getAllLeaderboards(arg);
      if (!error) {
        dispatch(getAllLeaderboardsSuccess(data));
      } else {
        dispatch(getAllLeaderboardsFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(getAllLeaderboardsFailure(formatError(error)));
    }
  };
}

export function addLeaderboardItem(arg: LeaderboardItemRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(addLeaderboardItemPending());
    try {
      const { error } = await leaderboardApi.addLeaderboardItem(arg);
      if (!error) {
        dispatch(addLeaderboardItemSuccess());
      } else {
        dispatch(addLeaderboardItemFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(addLeaderboardItemFailure(formatError(error)));
    }
  };
}

export default leaderboardSlice.reducer;
