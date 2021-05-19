import express from 'express';
import helmet from 'helmet';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';

import userAuthMiddleware from './user-auth-middleware';
import serverRenderMiddleware from './server-render-middleware';

const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
const styleSources = [
  "'self'",
  "'unsafe-inline'",
  'https://fonts.googleapis.com',
];
const fontSources = ["'self'", 'https://fonts.gstatic.com'];
const imageSources = ["'self'", 'data:', 'https://ya-praktikum.tech'];
const connectSources = ["'self'", 'https://ya-praktikum.tech'];

const app = express();
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: scriptSources,
      scriptSrcElem: scriptSources,
      styleSrc: styleSources,
      styleSrcElem: styleSources,
      fontSrc: fontSources,
      imgSrc: imageSources,
      connectSrc: connectSources,
    },
  })
);
app.use(cookieParser());
app.use(
  '/api/v2',
  createProxyMiddleware({
    target: 'https://ya-praktikum.tech',
    secure: false,
    cookieDomainRewrite: {
      '*': '',
    },
  })
);
app.use(
  '/api-forum',
  createProxyMiddleware({
    target: 'http://localhost:7000',
    secure: false,
    cookieDomainRewrite: {
      '*': '',
    },
  })
);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', userAuthMiddleware, serverRenderMiddleware);

export { app };
