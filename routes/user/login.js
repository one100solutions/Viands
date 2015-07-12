  var User, express, mongoose, router, tokenize;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  tokenize = require('../../lib/tokenize');

  User = mongoose.model('User');

  router.post('/', function(req, res) {
    if (req.body.phone && req.body.password) {
      req.body.password = tokenize(req.body.password);
      return User.findOne({
        phone: req.body.phone,
        password: req.body.password
      }, function(err, user) {
        if (err) {
          console.log(err);
          return res.json({
            err: true,
            message: err
          });
        } else if (!user) {
          return res.json({
            err: true,
            message: 'User not found!!'
          });
        } else if (user) {
          if (user.validation === false) {
            res.json({
              err: true,
              message: 'User not verified'
            });
            return;
          }
          user.token = tokenize(user.phone + user.email + user.password);
          return user.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: err
              });
            } else {
              user.password = null;
              return res.json({
                err: false,
                message: 'User found',
                user: user
              });
            }
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Missing Paramters'
      });
    }
  });

  module.exports = router;

