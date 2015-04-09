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

        User.findOne({
            token: req.body.token
        }, function (Err, user) {
            if(Err) {
                res.json({
                    err: true,
                    message: 'Error'
                })
            } else {
                var userId = user.id;

                Order.find({
                    user_id: user.id
                }, function (err, order) {
                    if(err) {
                        res.json({
                            err: true,
                            message: 'Error'
                        })
                    } else {
                        res.json ({
                            err:false,
                            message: 'Done',
                            orders: order
                        })
                    }
                })
            }
        })

    } else {
      return res.json({
        err: true,
        message: 'Missing Parameters'
      });
    }
  });

  module.exports = router;

}).call(this);
