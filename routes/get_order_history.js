(function() {
  var Order, User, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  User = mongoose.model('User');

  Order = mongoose.model('Order');

  router.post('/', function(req, res) {
    var orderInfo;
    orderInfo = [];
    if (req.body.token) {
      return User.findOne({
        token: req.body.token
      }, function(err, user) {
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else {
          return Order.find({
            user_id: user.id
          }, function(err, orders) {
            if (err) {
              return res.json({
                err: true,
                message: err
              });
            } else {
              return res.json({
                err: false,
                message: 'Orders retrieved',
                orders: orders
              });
            }
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
