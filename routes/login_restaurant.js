(function() {
  var Restaurant, express, mongoose, router, tokenize;

  express = require('express');

  router = express.Router();

  tokenize = require('../lib/tokenize');

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  router.post('/', function(req, res) {
    if (req.body.username && req.body.password) {
      return Restaurant.findOne({
        admin: {
          username: req.body.username,
          password: tokenize(req.body.password)
        }
      }, function(err, rest) {
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else if (rest) {
          rest.admin.token = tokenize(rest.admin.username + rest.name + rest.phone);
          return rest.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: err
              });
            } else {
              rest.admin.password = null;
              return res.json({
                err: false,
                message: 'Logged In',
                Restaurant: rest
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
        message: 'missing params'
      });
    }
  });

  module.exports = router;

}).call(this);
