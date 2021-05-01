import express from 'express';
import helmet from 'helmet';
import path from 'path';

const PORT: string | number = process.env.PORT || 4000;

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`); // eslint-disable-line
});