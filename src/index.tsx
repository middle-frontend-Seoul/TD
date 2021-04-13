import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './core/app/app';

ReactDOM.render(<App />, document.getElementById('root'));

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
