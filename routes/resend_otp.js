(function() {
  var User, express, messenger, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  User = mongoose.model('User');

  messenger = require('./lib/messenger_msg91');

  router.post('/', function(req, res) {
    if (req.body.phone && req.body.password) {
      return User.findOne({
        phone: req.body.phone,
        password: req.body.password
      }, function(err, user) {
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else if (user) {
          messenger(user.phone, 'your otp is: ' + user.otp, function(err, msg) {
            if (err) {
              return console.log(err);
            }
          });
          return res.json({
            err: false,
            message: 'Message Queued'
          });
        } else if (!user) {
          return res.json({
            err: true,
            message: 'No such user!'
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Invalid parameters'
      });
    }
  });

  module.exports = router;

}).call(this);
