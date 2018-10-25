const mongoose = require('mongoose');
const config = require('../config/config').get(process.env.NODE_ENV);
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);


module.exports.User = require('./User');
module.exports.Tweet = require('./Tweet');