(function() {
  var Notification, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Notification = mongoose.model('Notification');

  router.get('/', function(req, res) {
    return Notification.find({}, function(err, notifications) {
      if (err) {
        return res.json({
          err: true,
          message: 'Error occured'
        });
      } else {
        return res.json({
          err: false,
          message: 'Done',
          notifications: notifications
        });
      }
    });
  });

  module.exports = router;

}).call(this);
