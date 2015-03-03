var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tokenize = require('../lib/tokenize.js');

var UserSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  name: String,
  phone: Number,
  email: String,
  password: String,
  otp: String,
  credits: Number,
  token: String,
  validation: { type: Boolean, default: false }
});

mongoose.model('User', UserSchema);
