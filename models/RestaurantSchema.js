var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RestaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
  cost: Number,
  num_review: Number,
  num_photos: Number,
  phone: Number,
  gcm_id: [{type: String}],
  close: Boolean,
  menu: [{
    item_id: Schema.Types.ObjectId,
    sno: Number,
    name: String,
    category: String,
    pic: String,
    description: String,
    ratings: Number,
    cost: Number,
    available: Boolean
  }],
  admin: {
    username: String,
    password: String,
    token: String
  }
});

mongoose.model('Restaurant', RestaurantSchema);
