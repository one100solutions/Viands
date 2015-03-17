(function() {
  var User, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  User = mongoose.model('User');

  router.post('/', function(req, res) {
    if (req.body.password === 'remove_user') {
      return User.remove({}, function(err) {
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else {
          return res.json({
            err: false,
            message: 'Data cleared'
          });
        }
      });
    } else {
      return res.json({
        err: true,
        message: 'Incorrect Password'
      });
    }
  });

  module.exports = router;

}).call(this);
