(function() {
  var Credit, Restaurant, User, express, findAndCredit, gcm, moment, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  moment = require('moment');

  gcm = require('./lib/gcm');

  Restaurant = mongoose.model('Restaurant');

  Credit = mongoose.model('Credit');

  User = mongoose.model('User');

  findAndCredit = function(length, req, res) {
    if (length < 500) {
      req.body.amount += 0.10 * req.body.amount;
    }
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
        user.save(function(err) {
          var credit;
          if (err) {
            return res.json({
              err: true,
              message: 'Error occured'
            });
          } else {
            credit = new Credit({
              amount: req.body.amount,
              phone: req.body.tar_phone,
              time: new moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
            });
            return credit.save(function(err) {
              if (err) {
                return res.json({
                  err: true,
                  message: 'Somewhere error occured'
                });
              } else {
                return res.json({
                  err: false,
                  message: 'Recharge complete'
                });
              }
            });
          }
        });
        return gcm(1, 'Recharge ', "Hurray your account is now recharged with " + req.body.amount + " ", user.gcm_id);
      } else {
        return res.json({
          err: true,
          message: 'User not found'
        });
      }
    });
  };

  router.post('/', function(req, res) {
    console.log(req.body);
    if (req.body.username && req.body.token && req.body.tar_phone && req.body.amount) {
      req.body.amount = Number(req.body.amount);
      return Restaurant.findOne({
        'admin.username': req.body.username,
        'admin.token': req.body.token
      }, function(err, rest) {
        var length;
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
          length = 0;
          return User.find({}, function(err, users) {
            if (err) {
              res.json({
                err: true,
                message: "Error occured"
              });
            }
            length = users.length;
            return findAndCredit(length, req, res);
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
