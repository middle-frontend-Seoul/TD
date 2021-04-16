import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { App } from 'core/app/app';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then((registration) => {
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope
      );
    })
    .catch((error: string) => {
      console.log('ServiceWorker registration failed: ', error);
    });
}
