import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from 'core/app/app';
import { configureStore } from '@reduxjs/toolkit';
// import { createBrowserHistory, createMemoryHistory } from 'history';
import rootReducer from 'rdx/root-reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (cdm) => cdm({ serializableCheck: false }), // иначе ругается на AxiosError, которая под капотом class
});

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

// const history = isServer
//   ? createMemoryHistory({ initialEntries: ['/'] })
//   : createBrowserHistory();

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then((registration) => {
      console.log( // eslint-disable-line
        'ServiceWorker registration successful with scope: ',
        registration.scope
      );
    })
    .catch((error: string) => {
      console.log('ServiceWorker registration failed: ', error); // eslint-disable-line
    });
}
