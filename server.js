const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const config = require("./config/config").get(process.env.NODE_ENV);
const path = require('path');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3851;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});