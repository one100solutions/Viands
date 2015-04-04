(function() {
  var Notification, Restaurant, User, express, gcm, mongoose, notifyAll, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Notification = mongoose.model('Notification');

  Restaurant = mongoose.model('Restaurant');

  User = mongoose.model('User');

  gcm = require('../../lib/gcm');

  notifyAll = function(title, message) {
    return User.find({}, function(err, users) {
      var i, len, regIds, usr;
      if (err) {
        return console.log('Error occured');
      } else {
        regIds = [];
        for (i = 0, len = users.length; i < len; i++) {
          usr = users[i];
          regIds.push(usr.gcm_id);
        }
        return gcm(4, title, message, regIds);
      }
    });
  };

  router.post('/', function(req, res) {
    if (req.body.token && req.body.title && req.body.message) {
      return Restaurant.findOne({
        'admin.token': req.body.token
      }, function(err, rest) {
        var notification;
        if (err) {
          return res.json({
            err: true,
            message: 'Error occured'
          });
        } else if (rest) {
          notification = new Notification({
            title: req.body.title,
            message: req.body.message
          });
          return notification.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: 'Error occured!'
              });
            } else {
              res.json({
                err: false,
                message: 'Notification sent'
              });
              return notifyAll(req.body.title, req.body.message);
            }
          });
        } else {
          return res.json({
            err: true,
            message: 'No such Restaurant'
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
