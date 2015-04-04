(function() {
  var Restaurant, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  router.post('/', function(req, res) {
    if (req.body.restaurant_id) {
      return Restaurant.findOne({
        _id: req.body.restaurant_id
      }, function(err, restaurant) {
        if (err) {
          return res.json({
            err: true,
            message: 'Well Error'
          });
        } else if (restaurant) {
          restaurant.close = true;
          return restaurant.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: 'Error occured'
              });
            } else {
              return res.json({
                err: false,
                message: 'Done!'
              });
            }
          });
        } else {
          return res.json({
            err: true,
            message: 'No Restaurant'
          });
        }
      });
    }
  });

}).call(this);
