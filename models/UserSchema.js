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
  gcm_id: String,
  credits: Number,
  token: String,
  orders: [{ id: String}],
  validation: { type: Boolean, default: false }
});

mongoose.model('User', UserSchema);
