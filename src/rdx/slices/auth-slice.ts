import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { authApi } from 'api/auth-api';
import { formatError, formatHttpError } from 'utils/format';

export type AuthState = {
  currentUser?: UserInfo;
  loadingStatus: StateStatus;
  authStatus: StateStatus;
  error: AuthError;
};

export const initialState: AuthState = {
  loadingStatus: 'idle',
  authStatus: 'idle',
  error: {},
};

type AuthError = {
  currentUser?: SerializedError;
  auth?: SerializedError;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getCurrentUserPending: (state) => {
      state.loadingStatus = 'pending';
    },
    getCurrentUserSuccess: (
      state,
      action: PayloadAction<UserInfo | undefined>
    ) => {
      state.loadingStatus = 'success';
      state.currentUser = action.payload;
    },
    getCurrentUserFailure: (state, action: PayloadAction<SerializedError>) => {
      state.loadingStatus = 'failure';
      state.error.currentUser = action.payload;
    },

    signInPending: (state) => {
      state.authStatus = 'pending';
      state.error.auth = undefined;
    },
    signInSuccess: (state) => {
      state.authStatus = 'success';
    },
    signInFailure: (state, action: PayloadAction<SerializedError>) => {
      state.authStatus = 'failure';
      state.error.auth = action.payload;
    },

    signUpPending: (state) => {
      state.authStatus = 'pending';
      state.error.auth = undefined;
    },
    signUpSuccess: (state) => {
      state.authStatus = 'success';
    },
    signUpFailure: (state, action: PayloadAction<SerializedError>) => {
      state.authStatus = 'failure';
      state.error.auth = action.payload;
    },

    logoutPending: (state) => {
      state.authStatus = 'pending';
      state.error.auth = undefined;
    },
    logoutSuccess: (state) => {
      state.authStatus = 'success';
      state.currentUser = undefined;
    },
    logoutFailure: (state, action: PayloadAction<SerializedError>) => {
      state.authStatus = 'failure';
      state.error.auth = action.payload;
    },
  },
});

const {
  getCurrentUserPending,
  getCurrentUserSuccess,
  getCurrentUserFailure,

  signInPending,
  signInSuccess,
  signInFailure,

  signUpPending,
  signUpSuccess,
  signUpFailure,

  logoutPending,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export function getCurrentUser() {
  return async (dispatch: AppDispatch) => {
    dispatch(getCurrentUserPending());
    try {
      const { data, error } = await authApi.getCurrentUser();
      console.log('data', data);
      console.log('error', error);
      if (!error) {
        dispatch(getCurrentUserSuccess(data));
      } else {
        dispatch(getCurrentUserFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(getCurrentUserFailure(formatError(error)));
    }
  };
}

export function signIn(arg: SignInRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(signInPending());
    try {
      const { error } = await authApi.signIn(arg);
      if (!error) {
        dispatch(signInSuccess());
        dispatch(getCurrentUser());
      } else {
        dispatch(signInFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(signInFailure(formatError(error)));
    }
  };
}

export function signUp(arg: SignUpRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(signUpPending());
    try {
      const { error } = await authApi.signUp(arg);
      if (!error) {
        dispatch(signUpSuccess());
        dispatch(getCurrentUser());
      } else {
        dispatch(signUpFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(signUpFailure(formatError(error)));
    }
  };
}

export function logout() {
  return async (dispatch: AppDispatch) => {
    dispatch(logoutPending());
    try {
      const { error } = await authApi.logout();
      if (!error) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(logoutFailure(formatError(error)));
    }
  };
}

export default authSlice.reducer;
