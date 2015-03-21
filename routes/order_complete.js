(function() {
  var Order, Restaurant, User, express, findOrderAndComplete, mongoose, notifyUser, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  User = mongoose.model('User');

  Order = mongoose.model('Order');

  notifyUser = function(user_id, order) {};

  findOrderAndComplete = function(rest_id, res, order_id) {
    console.log('Restaurant id is ord', rest_id);
    return Order.findOne({
      restaurant_id: rest_id,
      _id: order_id
    }, function(err, order) {
      if (err) {
        return res.json({
          err: true,
          message: 'Error Occured'
        });
      } else if (order) {
        order.complete = true;
        return order.save(function(err) {
          if (err) {
            return res.json({
              err: true,
              message: 'Error!!'
            });
          } else {
            return res.json({
              err: false,
              message: "Order updated"
            });
          }
        });
      } else {
        return res.json({
          err: true,
          message: 'NO such order'
        });
      }
    });
  };

  router.post('/', function(req, res) {
    console.log('Request Body for order complete', req.body);
    if (req.body.token && req.body.order_id) {
      return Restaurant.findOne({
        'admin.token': req.body.token
      }, function(err, rest) {
        var rest_id;
        if (err) {
          return res.json({
            err: true,
            message: 'Error Occured'
          });
        } else if (rest) {
          rest_id = rest._id;
          return findOrderAndComplete(rest_id, res, req.body.order_id);
        } else {
          return res.json({
            err: true,
            message: 'No such restaurant'
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Missing params'
      });
    }
  });

  module.exports = router;

}).call(this);
