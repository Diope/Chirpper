const db = require('../models/');

exports.createTweet = async function(req, res, next){
  try{
    _user = req.params.id
    let user = await db.User.findById(_user)
    let tweet = await db.Tweet.create({
      tweet: req.body.tweet,
      user: _user
    });
    user.tweets.push(tweet.id);
    await user.save();

    let opt = {
      path: 'user',
      select: ['_id', 'username', 'email', 'profilePhoto']
    }

    let foundTweet = await db.Tweet.findById(tweet.id).populate(opt) // I forgot to await this, leading to the whole "converting to circular json smh"
    // console.log(foundTweet.user.username);
    return res.status(200).json(foundTweet);
  } catch (err) {
    return next(err)
  }
}


exports.getTweet = async function(req, res, next){
  try {
    let message = await db.Message.find(req.params.message_id);
    if (!message) {
      return next({status: 401, message: "Chirp could not be found, perhaps it has been deleted? 🤔"})
    }
    return res.status(200).json(message);
  } catch (err) {
    return next(err)
  }
}


exports.deleteTweet = async function(req, res, next){
  try {
    let message = await db.Message.findById(req.params.message_id);
    await message.remove();
    return res.status(200).json(message)
  } catch (err) {
    return next(err);
  }
}

exports.getAllTweets = async function(req, res, next) {
  try {
    let messages = await db.Message.find({}).sort({createdAt: "desc"})
    if (!messages) {
      return next({status: 401, message: "Oh dear, looks like our servers have derped when they should have beep booped!"})
    }
    return res.status(200).json(messages);
  } catch (err) {
    return next(err)
  }
}