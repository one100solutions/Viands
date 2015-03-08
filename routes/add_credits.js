(function() {
  var Restaurant, User, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  User = mongoose.model('User');

  router.post('/', function(req, res) {
    console.log(req.body);
    if (req.body.username && req.body.token && req.body.tar_phone && req.body.amount) {
      req.body.amount = Number(req.body.amount);
      return Restaurant.findOne({
        'admin.username': req.body.username,
        'admin.token': req.body.token
      }, function(err, rest) {
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else if (!rest) {
          return res.json({
            err: true,
            message: 'Incorrect Credentials'
          });
        } else if (rest) {
          return User.findOne({
            phone: req.body.tar_phone
          }, function(err, user) {
            if (err) {
              return res.json({
                err: true,
                message: err
              });
            } else if (user) {
              user.credits += req.body.amount;
              user.save();
              return res.json({
                err: false,
                message: 'Recharge complete'
              });
            } else {
              return res.json({
                err: true,
                message: 'User not found'
              });
            }
          });
        } else {
          return res.json({
            err: true,
            message: 'Unknown error'
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Missing/Incorrect params'
      });
    }
  });

  module.exports = router;

}).call(this);
