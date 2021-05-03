import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { App } from 'core/app/app';
import { createStore } from 'rdx/store';

const { store, history } = createStore(window.__INITIAL_STATE__); // eslint-disable-line

ReactDOM.hydrate(
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ReduxProvider>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
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
