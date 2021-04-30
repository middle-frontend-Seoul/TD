import express from 'express';
import helmet from 'helmet';
import path from 'path';
import serverRenderMiddleware from './server-render-middleware';

// const PORT: string | number = process.env.PORT || 4000;

const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
const styleSources = ["'self'", "'unsafe-inline'"];
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
      connectSrc: connectSources,
    },
  })
);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', serverRenderMiddleware);

// app.listen(PORT, () => {
//   console.log(`Server is up and running on port ${PORT}`); // eslint-disable-line
// });

export { app };
