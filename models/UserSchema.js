var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  name: String,
  phone: Number,
  email: String,
  password: String,
  validation: { type: Boolean, default: false }
});

mongoose.model('User', UserSchema);
