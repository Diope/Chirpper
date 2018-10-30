const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const TweetSchema = Schema({
  tweet: {
    type: String,
    required: true,
    maxLength: [280, "Your tweet exceeds 280 characters"]
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  likes: [{ user: {type: Schema.Types.ObjectId, ref: 'User'}}]
},{timestamps: true});

TweetSchema.pre('remove', async function(next) {
  try {
    let user = await User.findById(this.userId);
    user.message.remove(this.id);
    return next()
  } catch (err) {
    return next(err)
  }
});



const Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet;