(function() {
  var AccountDetails, Order, User, express, mongoose, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  AccountDetails = require('../../modules/getUserAccountDetails');

  User = mongoose.model('User');

  Order = mongoose.model('Order');

  router.post('/', function(req, res) {
    if (req.body.token) {
      return AccountDetails.getOrders(req.body.token, function(response) {
        console.log('Response is ', response);
        return res.json(response);
      });
    } else {
      return res.json({
        err: true,
        message: 'Missing Parameters'
      });
    }
  });

  module.exports = router;

}).call(this);
