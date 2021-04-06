const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express(helmet());
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Dev server is up and running on port ${ PORT }`);
});
