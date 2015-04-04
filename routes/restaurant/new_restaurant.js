(function() {
  var Restaurant, express, mongoose, router, tokenize;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  tokenize = require('../../lib/tokenize');

  router.post('/', function(req, res) {
    console.log('In route handler');
    if (req.body.username && req.body.password && req.body.rest_name && req.body.phone) {
      return Restaurant.findOne({
        name: req.body.rest_name,
        phone: req.body.phone
      }, function(err, rest) {
        var new_rest;
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else if (rest) {
          return res.json({
            err: true,
            message: 'Restaurant exists!!'
          });
        } else if (!rest) {
          new_rest = new Restaurant({
            name: req.body.rest_name,
            phone: req.body.phone,
            admin: {
              username: req.body.username,
              password: tokenize(req.body.password)
            }
          });
          return new_rest.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: err
              });
            } else {
              return res.json({
                err: false,
                message: 'Restaurant Added'
              });
            }
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Missing paramteres'
      });
    }
  });

  module.exports = router;

}).call(this);
