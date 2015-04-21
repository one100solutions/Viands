(function() {
  var Order, Restaurant, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Order = mongoose.model('Order');

  Restaurant = mongoose.model('Restaurant');

  router.post('/', function(req, res) {
    if (req.body.token) {
      return Restaurant.findOne({
        'admin.token': req.body.token
      }, function(err, restaurant) {
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else if (restaurant) {
          return Order.find({
            restaurant_id: restaurant._id,
            complete: false
          }, function(err, orders) {
            if (err) {
              return res.json({
                err: true,
                message: err
              });
            } else if (orders) {
              console.log('Orders receive', orders)
              return res.json({
                err: false,
                message: 'Orders found',
                orders: orders
              });
            } else {
              return res.json({
                err: true,
                message: 'No Orders'
              });
            }
          });
        } else {
          return res.json({
            err: true,
            message: 'Restaurant not found'
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Missing Parameters'
      });
    }
  });

  module.exports = router;

}).call(this);
