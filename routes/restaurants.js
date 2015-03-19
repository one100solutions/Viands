(function() {
  var Restaurants, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurants = mongoose.model('Restaurant');

  router.get('/', function(req, res) {
    return Restaurants.find({}, function(error, restaurants) {
      var i, len, restaurant;
      if (error) {
        return res.json({
          err: true,
          message: error
        });
      } else if (restaurants) {
        for (i = 0, len = restaurants.length; i < len; i++) {
          restaurant = restaurants[i];
          restaurant.admin = null;
        }
        return res.json({
          err: false,
          message: 'Search complete',
          restaurants: restaurants
        });
      } else {
        return res.json({
          err: true,
          message: 'No restaurants found'
        });
      }
    });
  });

  module.exports = router;

}).call(this);
