import express from 'express';
import helmet from 'helmet';
import path from 'path';
import serverRenderMiddleware from './server-render-middleware';

const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
const styleSources = [
  "'self'",
  "'unsafe-inline'",
  'https://fonts.googleapis.com',
];
const fontSources = ["'self'", 'https://fonts.gstatic.com'];
const imageSources = ["'self'", 'data:'];
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

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', serverRenderMiddleware);

export { app };
