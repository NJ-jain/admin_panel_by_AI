const express = require('express');
const cors = require("cors");

const app = express();
const port = 5001;
app.use(cors())
app.use(express.json());
const dotenv = require('dotenv').config()
//connect mongodb

app.use('/run',require("./router/index"))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
//   insertSchema();
});
