(function() {
  var User, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  User = mongoose.model('User');

  router.post('/', function(req, res) {
    if (req.body.token) {
      return User.findOne({
        token: req.body.token
      }, function(err, user) {
        if (err) {
          return res.json({
            err: true,
            message: 'Error Occured'
          });
        } else if (user) {
          return res.json({
            err: false,
            message: 'Done!',
            credits: user.credits
          });
        } else {
          return res.json({
            err: true,
            message: 'No such user'
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Missing Params'
      });
    }
  });

  module.exports = router;

}).call(this);
