(function() {
  var Restaurant, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  var MailAccount = require('../../lib/mailAccount');

  router.post('/', function(req, res) {
    if (req.body.restaurant_id && req.body.close) {
      return Restaurant.findOne({
        _id: req.body.restaurant_id
      }, function(err, restaurant) {
        if (err) {
          return res.json({
            err: true,
            message: 'Well Error'
          });
        } else if (restaurant) {
          restaurant.close = req.body.close;
          console.log(req.body.close);
          return restaurant.save(function(err, rest) {
            if (err) {
              return res.json({
                err: true,
                message: 'Error occurred'
              });
            } else {

              MailAccount.mailInfo(rest.token);

              return res.json({
                err: false,
                message: 'Done!'
              });
            }
          });
        } else {
          return res.json({
            err: true,
            message: 'No Restaurant'
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
