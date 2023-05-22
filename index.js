const express = require('express');
const { insertSchema } = require('./dbServices/schemaService');
const app = express();
const port = 5001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
//   insertSchema();
});
