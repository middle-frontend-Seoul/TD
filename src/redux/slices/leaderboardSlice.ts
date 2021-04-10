import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';

import { leaderboardApi } from 'api/leaderboard-api';

type LeaderboardState = {
  data?: LeaderboardInfo[];
  isLoading: boolean;
  error?: SerializedError | HttpError;
};

const initialState: LeaderboardState = {
  isLoading: false,
};

export const getAllLeaderboards = createAsyncThunk<
  LeaderboardInfo[] | undefined,
  LeaderboardRequestInfo,
  { rejectValue: HttpError }
>('leaderboard/getAllLeaderboards', async (arg, thunkApi) => {
  const { data, error } = await leaderboardApi.getAllLeaderboards(arg);
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return data;
});

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLeaderboards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllLeaderboards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllLeaderboards.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default leaderboardSlice.reducer;
