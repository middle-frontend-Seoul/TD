import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RouterState } from 'connected-react-router';

import { AuthState } from 'rdx/slices/auth-slice';
import { LeaderboardState } from 'rdx/slices/leaderboard-slice';
import { UserState } from 'rdx/slices/user-slice';
import { ForumState } from 'rdx/slices/forum-slice';
import { store } from 'rdx/store';

declare global {
  type RootState = {
    auth: AuthState,
    forum: ForumState,
    leaderboard: LeaderboardState,
    user: UserState,
    router: RouterState,
  };
  type AppDispatch = typeof store.dispatch;
  type UseBoundAction = {
    <I extends any[], R extends Action>(actionCreator: (...args: I) => R): (...args: I) => R;
    <I extends any[], R extends any>(actionCreator: (...args: I) => ThunkAction<R>): (...args: I) => R;
  };

  type StateStatus = 'idle' | 'pending' | 'success' | 'failure';

  type AppError = {
    name?: string;
    message?: string;
  }

  type AppActionParams<T, R> = {
    payload: T;
    callback?: {
      onSuccess?: (response: R) => void;
      onFailure?: () => void;
    }
  }

  type GenericState<T> = {
    data?: T;
    isLoading: boolean;
    isMutating: boolean;
    error?: any;
  }
}
