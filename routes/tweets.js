const express = require('express');
const router = express.Router({mergeParams: true});

const {createTweet, deleteTweet, getTweet} = require('../controllers/tweets')

router.route("/").post(createTweet);

router.route("/:message_id")
  .get(getTweet)
  .delete(deleteTweet)


module.exports = router;