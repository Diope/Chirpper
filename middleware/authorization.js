const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(path.join(__dirname, '../config') + '/public.key', 'utf8');
const signOptions = {
  issuer: 'dipet.me',
  expiresIn: '15d',
  algorithm: "RS256"
}

exports.loginRequired = function(req, res, next){
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, publicKey, signOptions, (err, decoded) => {
      if (decoded) {
        return next();
      } else {
        return next({status: 401, message: "You are not authorized to perform that action, please login or sign up."})
      }
    })
  } catch (err) {
    return next({status: 401, message: "You are not authorized to perform that action, please login or sign up."})
  }
}

exports.correctUser = function(req, res, next){
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, publicKey, signOptions, (err, decoded) => {
      // console.log(decoded.id)
      if (decoded && decoded.id === req.params.id) {
        req.user = decoded;
        return next()
      } else {
        return next({status: 401, message: "Uh oh! Unfortunately you are not authorized to perform that action! Please login or signup!"})
      }
    })
  } catch (err) {
    return next({status: 401, message: "Uh oh! Unfortunately you are not authorized to perform that action! Please login or signup!"})
  }
}