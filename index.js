const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose')
const app = express();
const port = 5001;
app.use(cors())
app.use(express.json());
const dotenv = require('dotenv').config()
//connect mongodb

app.use('/adminpanel',require("./router/index"))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, async() => {
  const conn = await mongoose.connect(process.env.MONGODB_URI , {
    useUnifiedTopology:true,
    useNewUrlParser:true,
  })
  console.log(`Server listening on port ${port}`);
//   insertSchema();
});
