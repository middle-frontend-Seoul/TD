import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { isServer } from 'utils/ssr';
import createRootReducer from './root-reducer';

export function createStore(initialState: RootState, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: (cdm) =>
      cdm({ serializableCheck: false }).concat(routerMiddleware(history)), // иначе ругается на AxiosError, которая под капотом class
    preloadedState: initialState,
  });

  return { store, history };
}
