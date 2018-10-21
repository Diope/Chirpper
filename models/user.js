const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is not valid, please enter a valid email"
    ],
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [25, "Username must be no longer than 25 characters"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash){
        if (err) throw new Error(err)
        user.password = hash;
        next();
      })
    })
  } else {
    next()
  }
});

const User = mongoose.model("User", UserSchema);