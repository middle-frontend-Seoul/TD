import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';

import { userApi } from 'api/user-api';

type UserState = {
  data?: UserInfo;
  isLoading: boolean;
  isMutating: boolean;
  error: UserError;
};

type UserError = {
  user?: SerializedError | HttpError;
  password?: SerializedError | HttpError;
  avatar?: SerializedError | HttpError;
};

const initialState: UserState = {
  isLoading: false,
  isMutating: false,
  error: {},
};

export const getUser = createAsyncThunk<
  UserInfo | undefined,
  AppActionParams<number, UserInfo | undefined>,
  { rejectValue: HttpError }
>('user/getUser', async ({ payload: userId, callback }, thunkApi) => {
  try {
    const { data, error } = await userApi.getUser(userId);
    if (error) {
      callback?.onFailure?.();
      return thunkApi.rejectWithValue(error);
    }
    callback?.onSuccess?.(data);
    return data;
  } catch (error) {
    callback?.onFailure?.();
    return thunkApi.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk<
  UserInfo | undefined,
  AppActionParams<UserRequestInfo, UserInfo | undefined>,
  { rejectValue: HttpError }
>('user/updateUser', async ({ payload, callback }, thunkApi) => {
  try {
    const { data, error } = await userApi.updateUser(payload);
    if (error) {
      callback?.onFailure?.();
      return thunkApi.rejectWithValue(error);
    }
    callback?.onSuccess?.(data);
    return data;
  } catch (error) {
    callback?.onFailure?.();
    return thunkApi.rejectWithValue(error);
  }
});

export const updateAvatar = createAsyncThunk<
  null | undefined,
  AppActionParams<FileList, null | undefined>,
  { rejectValue: HttpError }
>('user/updateAvatar', async ({ payload, callback }, thunkApi) => {
  try {
    const { data, error } = await userApi.updateAvatar(payload);
    if (error) {
      callback?.onFailure?.();
      return thunkApi.rejectWithValue(error);
    }
    callback?.onSuccess?.(data);
    return data;
  } catch (error) {
    callback?.onFailure?.();
    return thunkApi.rejectWithValue(error);
  }
});

export const updatePassword = createAsyncThunk<
  null | undefined,
  AppActionParams<UserPasswordRequestInfo, null | undefined>,
  { rejectValue: HttpError }
>('user/updatePassword', async ({ payload, callback }, thunkApi) => {
  try {
    const { data, error } = await userApi.updatePassword(payload);
    if (error) {
      callback?.onFailure?.();
      return thunkApi.rejectWithValue(error);
    }
    callback?.onSuccess?.(data);
    return data;
  } catch (error) {
    callback?.onFailure?.();
    return thunkApi.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error.user = action.payload;
      } else {
        state.error.user = action.error;
      }
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isMutating = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isMutating = false;
      state.data = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isMutating = false;
      if (action.payload) {
        state.error.user = action.payload;
      } else {
        state.error.user = action.error;
      }
    });

    builder.addCase(updateAvatar.pending, (state) => {
      state.isMutating = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state) => {
      state.isMutating = false;
    });
    builder.addCase(updateAvatar.rejected, (state, action) => {
      state.isMutating = false;
      if (action.payload) {
        state.error.avatar = action.payload;
      } else {
        state.error.avatar = action.error;
      }
    });

    builder.addCase(updatePassword.pending, (state) => {
      state.isMutating = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.isMutating = false;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isMutating = false;
      if (action.payload) {
        state.error.password = action.payload;
      } else {
        state.error.password = action.error;
      }
    });
  },
});

export default userSlice.reducer;
