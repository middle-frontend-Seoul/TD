import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { userApi } from 'api/user-api';
import { formatError, formatHttpError } from 'utils/format';

export type UserState = {
  data?: UserInfo;
  loadingStatus: StateStatus;
  mutatingUserStatus: StateStatus;
  mutatingPasswordStatus: StateStatus;
  mutatingAvatarStatus: StateStatus;
  error: UserError;
};

type UserError = {
  user?: SerializedError;
  password?: SerializedError;
  avatar?: SerializedError;
};

export const initialState: UserState = {
  loadingStatus: 'idle',
  mutatingUserStatus: 'idle',
  mutatingPasswordStatus: 'idle',
  mutatingAvatarStatus: 'idle',
  error: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.loadingStatus = 'pending';
      state.error.user = undefined;
    },
    getUserSuccess: (state, action: PayloadAction<UserInfo | undefined>) => {
      state.loadingStatus = 'success';
      state.data = action.payload;
    },
    getUserFailure: (state, action: PayloadAction<SerializedError>) => {
      state.loadingStatus = 'failure';
      state.error.user = action.payload;
    },

    updateUserPending: (state) => {
      state.mutatingUserStatus = 'pending';
      state.error.user = undefined;
    },
    updateUserSuccess: (state, action: PayloadAction<UserInfo | undefined>) => {
      state.mutatingUserStatus = 'success';
      state.data = action.payload;
    },
    updateUserFailure: (state, action: PayloadAction<SerializedError>) => {
      state.mutatingUserStatus = 'failure';
      state.error.user = action.payload;
    },

    updateAvatarPending: (state) => {
      state.mutatingAvatarStatus = 'pending';
      state.error.avatar = undefined;
    },
    updateAvatarSuccess: (state) => {
      state.mutatingAvatarStatus = 'success';
    },
    updateAvatarFailure: (state, action: PayloadAction<SerializedError>) => {
      state.mutatingAvatarStatus = 'failure';
      state.error.avatar = action.payload;
    },

    updatePasswordPending: (state) => {
      state.mutatingPasswordStatus = 'pending';
      state.error.password = undefined;
    },
    updatePasswordSuccess: (state) => {
      state.mutatingPasswordStatus = 'success';
    },
    updatePasswordFailure: (state, action: PayloadAction<SerializedError>) => {
      state.mutatingPasswordStatus = 'failure';
      state.error.password = action.payload;
    },
  },
});

const {
  getUserPending,
  getUserSuccess,
  getUserFailure,

  updateUserPending,
  updateUserSuccess,
  updateUserFailure,

  updateAvatarPending,
  updateAvatarSuccess,
  updateAvatarFailure,

  updatePasswordPending,
  updatePasswordSuccess,
  updatePasswordFailure,
} = userSlice.actions;

export function getUser(id: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(getUserPending());
    try {
      const { data, error } = await userApi.getUser(id);
      if (!error) {
        dispatch(getUserSuccess(data));
      } else {
        dispatch(getUserFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(getUserFailure(formatError(error)));
    }
  };
}

export function updateUser(arg: UserRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(updateUserPending());
    try {
      const { data, error } = await userApi.updateUser(arg);
      if (!error) {
        dispatch(updateUserSuccess(data));
      } else {
        dispatch(updateUserFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(updateUserFailure(formatError(error)));
    }
  };
}

export function updateAvatar(arg: FileList) {
  return async (dispatch: AppDispatch) => {
    dispatch(updateAvatarPending());
    try {
      const { error } = await userApi.updateAvatar(arg);
      if (!error) {
        dispatch(updateAvatarSuccess());
      } else {
        dispatch(updateAvatarFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(updateAvatarFailure(formatError(error)));
    }
  };
}

export function updatePassword(arg: UserPasswordRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(updatePasswordPending());
    try {
      const { error } = await userApi.updatePassword(arg);
      if (!error) {
        dispatch(updatePasswordSuccess());
      } else {
        dispatch(updatePasswordFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(updatePasswordFailure(formatError(error)));
    }
  };
}

export default userSlice.reducer;
