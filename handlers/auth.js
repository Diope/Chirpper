const db = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(path.join(__dirname, '../config') + '/public.key', 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname, '../config') + '/private.key', 'utf8');
const signOptions = {
  issuer: 'dipet.me',
  expiresIn: '15d', 
  algorithm: "RS256"
}

exports.signup = function(req, res, next) {
  let id = req.body.id
  let username = req.body.profile.username
  let email = req.body.email

  db.User.findOne({$or: [{username}, {email}]}).then(result => {
    if (null !== result) {
      if (username === result.profile.username){
        return next(new Error(`The name ${username} is already in use.`))
      } else if (email === result.email) {
        return next(new Error(`The email ${email} is already in use.`))
      }
    }
    db.User.create(req.body)
    let token = jwt.sign({id, username, email}, privateKey, signOptions)
    return res.status(200).json({token})
  })
}

exports.signin = async function(req, res, next){
  // let id = req.body.id
  // let username = req.body.profile.username
  try {
    let user = await db.User.findOne({email: req.body.email});
    if (!user) {
      return next({message: `The email ${req.body.email} could not be found, please try a different email`})
    }
    let isMatch = await user.comparePassword(req.body.password)
    if (!isMatch) {
      return next({status: 400, message: "The supplied password is incorrect, please try again"})
    } else {
      let token = jwt.sign({id: user.id, username: user.profile.username, email: user.email}, privateKey, signOptions)
      return res.status(200).json({username: user.profile.username, user: user.email, token})
    }
  }catch (err) {
    return next({status: 400, message: "Invalid email or password"})
  }
}