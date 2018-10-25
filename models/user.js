const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const publicKey = fs.readFileSync(path.join(__dirname, '../config') + '/public.key', 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname, '../config') + '/private.key', 'utf8');

const SALT_ROUNDS = 13;

const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is not valid, please enter a valid email"
    ],
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    profilePhoto: {type: String},
    chirpperName: {
      type: String, trim: true, minlength: [1, "Chirppername must be at least 1 character long"], maxlength: [25, "Chirpper name must be no longer than 25 characters"]
    },
    username: {
      type: String,
      required: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [25, "Username must be no longer than 25 characters"],
      unique: true,
      trim: true
    },
  }
});

UserSchema.pre('save', async function(next) { // I really need to start usnig async/await more.
  var user = this;
  try {
    if(!user.isModified("password")) {
      return next()
    }
    let hashedPass = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPass;
    return next()
  } catch (err) {
    return next(err)
  }
  // if(user.isModified('password')) {
  //   bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
  //     if (err) return next(err)
  //     bcrypt.hash(user.password, salt, function(err, hash){
  //       if (err) throw new Error(err)
  //       user.password = hash;
  //       next();
  //     })
  //   })
  // } else {
  //   next()
  // }
});

// METHODS
UserSchema.methods.comparePassword = async function (candidatePass, next) {
  // bcrypt.compare(candidatePass, this.password, function(err, isMatch){
  //   if (err) return cb(err);
  //   cb(null, isMatch)
  // })
  try {
    let isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
  } catch (err) {
    return next(err)
  }
}

UserSchema.methods.generateJWT = async function(next) {
  var user = this;

  let payload = {
    id: user._id,
    username: user.profile.username,
    email: user.email
  }

  let signOptions = {
    issuer: 'dipet.me',
    expiresIn: '15d',
    algorithm: "RS256"
  }
  
  try {
    let token = await jwt.sign(payload, privateKey, signOptions)
    return token
  } catch (err) {
    return next(err)
  }
}

const User = mongoose.model("User", UserSchema);
module.exports = User