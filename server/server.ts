import express from 'express';
import helmet from 'helmet';
import path from 'path';

const PORT: string | number = process.env.PORT || 4000;

const app = express();

app.use(helmet());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
