(function() {
  var Order, Restaurant, User, express, findOrderAndComplete, gcm, messenger, mongoose, notifyUser, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  User = mongoose.model('User');

  Order = mongoose.model('Order');

  messenger = require('../lib/springedge');

  gcm = require('../lib/gcm');

  notifyUser = function(user_id, order) {
    return User.findOne({
      id: user_id
    }, function(err, user) {
      if (err) {
        return res.json({
          err: true,
          message: 'Error'
        });
      } else if (user) {
        return gcm(2, 'Order confirmation!!', "Your order id " + order.id + " is delivered", user.gcm_id);
      }
    });
  };

  findOrderAndComplete = function(rest_id, res, order_id) {
    console.log('Restaurant id is ord', rest_id);
    return Order.findOne({
      restaurant_id: rest_id,
      id: order_id
    }, function(err, order) {
      if (err) {
        return res.json({
          err: true,
          message: 'Error Occured'
        });
      } else if (order) {
        order.delivered = true;
        return order.save(function(err) {
          if (err) {
            return res.json({
              err: true,
              message: 'Error!!'
            });
          } else {
            notifyUser(order.user_id, order);
            return res.json({
              err: false,
              message: "Order delivered"
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
