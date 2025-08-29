console.log("✅ index.js started");

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, my movie API is working!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
