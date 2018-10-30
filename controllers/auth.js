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

exports.signup = function(req, res, next){ // TODO: convert to async
  let id = req.body._id
  let username = req.body.username
  let email = req.body.email
  
  db.User.findOne({$or: [{username}, {email}]}).then(user => {
    if (null !== user) {
      if (username === user.username){
        return next(new Error(`The name ${username} is already in use.`))
      } else if (email === user.email) {
        return next(new Error(`The email ${email} is already in use.`))
      }
    }
    db.User.create(req.body).then(result => {
      console.log(result)
      let token = jwt.sign({id: result._id, username:result.username, email: result.email}, privateKey, signOptions)
      console.log(token)

      return res.status(200).json({token: `bearer ${token}`, id: result._id, username: result.username, email: result.email, profilePhoto: result.profilePhoto})
    }).catch(err => next(err))
  }).catch(err => next(err))
}

exports.signin = async function(req, res, next){
  try {
    let user = await db.User.findOne({email: req.body.email});
    if (!user) {
      return next({message: `The email ${req.body.email} could not be found, please try a different email`})
    }
    let isMatch = await user.comparePassword(req.body.password)
    if (!isMatch) {
      return next({status: 400, message: "The supplied password is incorrect, please try again"})
    } else {
      let token = jwt.sign({id: user._id, username: user.username, email: user.email}, privateKey, signOptions)
      return res.status(200).json({id: user.id, username: user.username, user: user.email, token: `bearer ${token}`})
    }
  }catch (err) {
    return next({status: 400, message: "Invalid email or password"})
  }
}