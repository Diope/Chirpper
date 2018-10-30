const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const db = require('./models');

const errorHandler = require("./controllers/error");
const authRoutes = require('./routes/auth')
const tweetRoutes = require('./routes/tweets');

app.use(cors());
bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/users/:id/tweets', tweetRoutes);
app.get("/api/messages", async function(req, res, next) {
  try {
    let messages = await db.Message.find({}).sort({createdAt: "desc"}).populate("user", {username: true,profilePhoto: true })
    return res.status(200).json(messages)
  } catch (err) {
    return next(err)
  }
})

app.use((req, res, next) => {
  let err = new Error("Whoops! Looks like something went horribly, horribly wrong here!");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3550;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});