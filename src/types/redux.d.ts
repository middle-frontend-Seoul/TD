import { Action, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from 'redux/rootReducer';
import { store } from 'redux/store';

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = typeof store.dispatch;
  type UseBoundAction = {
    <I extends any[], R extends Action>(actionCreator: (...args: I) => R): (...args: I) => R;
    <I extends any[], R extends any>(actionCreator: (...args: I) => ThunkAction<R>): (...args: I) => R;
  };

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
