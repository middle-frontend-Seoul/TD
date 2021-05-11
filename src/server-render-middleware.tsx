import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter, matchPath } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import url from 'url';

import { App } from 'core/app';
import { URL } from 'core/url';

import { createStore } from 'rdx/store';
import { getInitialState } from 'rdx/getInitialState';
import { getCurrentUser } from 'rdx/slices/auth-slice';

function getHtml(reactHtml: string, reduxState = {}) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <!-- <link rel="preconnect" href="https://fonts.gstatic.com"> -->
            <!-- <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;900&display=swap" rel="stylesheet"> -->
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
  const location = req.url;
  const context: StaticRouterContext = {};
  const { store } = createStore(getInitialState(location), location);

  function renderApp() {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={location}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    );

    const reactHtml = renderToString(jsx);
    const reduxState = store.getState();

    res.status(context.statusCode || 200).send(getHtml(reactHtml, reduxState));
  }

  const fetchCurrentUser = getCurrentUser();
  const dataRequests: (Promise<void> | void)[] = [
    fetchCurrentUser(store.dispatch),
  ];

  Object.values(URL).some((route) => {
    const parsedUrl = url.parse(location);

    if (!parsedUrl || parsedUrl.pathname === null) return false;

    const { fetchData } = route;

    const match = matchPath<{ id: string }>(parsedUrl.pathname, route);
    const searchParams = new URLSearchParams(parsedUrl.search || undefined);

    if (match && fetchData) {
      dataRequests.push(
        fetchData({ dispatch: store.dispatch, match, searchParams })
      );
    }

    return Boolean(match);
  });

  return Promise.all(dataRequests)
    .then(() => {
      renderApp();
    })
    .catch((error) => {
      throw error;
    });
};
