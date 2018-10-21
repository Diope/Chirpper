const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config").get(process.env.NODE_ENV);
const PORT = process.env.PORT || 3550;
const errorHandler = require("./handlers/error");

const path = require('path');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});