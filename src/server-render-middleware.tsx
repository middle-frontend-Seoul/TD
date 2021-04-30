import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
// import { App } from 'core/app';
// import { StaticRouter } from 'react-router-dom';
// import { StaticRouterContext } from 'react-router';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';

// import rootReducer from 'redux/root-reducer';

function getHtml(reactHtml: string, reduxState = {}) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;900&display=swap" rel="stylesheet">
            <title>TD</title>
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            <script src="/main.js"></script>
        </body>
        </html>
    `;
}

export default (req: Request, res: Response) => {
  console.log('middleware');
  console.log(req.url);
  // const location = req.url;
  // const context: StaticRouterContext = {};
  // const store = configureStore({
  //   reducer: rootReducer,
  //   middleware: (cdm) => cdm({ serializableCheck: false }), // иначе ругается на AxiosError, которая под капотом class
  // });
  const jsx = (
    <div>SERVER!!!</div>
  );

  const reactHtml = renderToString(jsx);
  // const reduxState = store.getState();

  // if (context.url) {
  //   res.redirect(context.url);
  //   return;
  // }

  res.status(200).send(getHtml(reactHtml, {}));
};
