(function() {
  var Restaurant, User, express, gcm, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  User = mongoose.model('User');

  Restaurant = mongoose.model('Restaurant');

  gcm = require('../../lib/gcm');

  router.post('/', function(req, res) {
    console.log("Request body", req.body);
    if (req.body.token && req.body.gcm_id && req.body.mode === '1') {
      return User.findOne({
        token: req.body.token
      }, function(err, user) {
        if (err) {
          return res.json({
            err: true,
            message: 'Error occured!'
          });
        } else if (user) {
          user.gcm_id = req.body.gcm_id;
          return user.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: 'Error occured!!'
              });
            } else {
              return res.json({
                err: false,
                message: 'Device Registered'
              });
            }
          });
        } else {
          return res.json({
            err: true,
            message: 'No such user found'
          });
        }
      });
    } else if (req.body.token && req.body.gcm_id && req.body.mode === '0') {
      return Restaurant.findOne({
        'admin.token': req.body.token
      }, function(err, restaurant) {
        if (err) {
          return res.json({
            err: true,
            message: 'Error ocurred'
          });
        } else if (restaurant) {
          restaurant.gcm_id.push(req.body.gcm_id);
          return restaurant.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: 'Error occured!'
              });
            } else {
              return res.json({
                err: false,
                message: 'Deivce Registered'
              });
            }
          });
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
