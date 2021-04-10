import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';

import { authApi } from 'api/auth-api';

type AuthState = {
  currentUser?: UserInfo;
  isLoading: boolean;
  isMutating: boolean;
  error?: SerializedError | HttpError;
};

const initialState: AuthState = {
  isLoading: false,
  isMutating: false,
};

export const getCurrentUser = createAsyncThunk<
  UserInfo | undefined,
  undefined,
  { rejectValue: HttpError }
>('auth/getCurrentUser', async (_, thunkApi) => {
  const { data, error } = await authApi.getCurrentUser();
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return data;
});

export const signIn = createAsyncThunk<
  SignInInfo | undefined,
  SignInRequestInfo,
  { rejectValue: HttpError }
>('auth/signIn', async (arg, thunkApi) => {
  const { data, error } = await authApi.signIn(arg);
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  thunkApi.dispatch(getCurrentUser());
  return data;
});

export const signUp = createAsyncThunk<
  SignUpInfo | undefined,
  SignUpRequestInfo,
  { rejectValue: HttpError }
>('auth/signUp', async (arg, thunkApi) => {
  const { data, error } = await authApi.signUp(arg);
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  thunkApi.dispatch(getCurrentUser());
  return data;
});

export const logout = createAsyncThunk<
  string | undefined,
  undefined,
  { rejectValue: HttpError }
>('auth/logout', async (arg, thunkApi) => {
  const { data, error } = await authApi.logout();
  if (error) {
    return thunkApi.rejectWithValue(error);
  }
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });

    builder.addCase(signIn.pending, (state) => {
      state.isMutating = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.isMutating = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isMutating = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });

    builder.addCase(signUp.pending, (state) => {
      state.isMutating = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isMutating = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isMutating = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });

    builder.addCase(logout.pending, (state) => {
      state.isMutating = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isMutating = false;
      state.currentUser = undefined;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isMutating = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default authSlice.reducer;
