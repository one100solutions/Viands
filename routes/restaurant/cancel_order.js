(function() {
  var Notification, Restaurant, User, express, gcm, mongoose, notifyAll, router;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');

  User = mongoose.model('User');

  gcm = require('../../lib/gcm');

  var Order = mongoose.model('Order');

  router.post('/', function(req, res, next) {
    if (req.body.token && req.body.order_id) {
      Restaurant.findOne({
        'admin.token': req.body.token
      }, function(err, rest) {
        
        if (err) {
          res.json({
            err: true,
            message: 'Error occured'
          });
        } else if (rest) {
          console.log('Order id is ',req.body.order_id);

          Order.findOne({
            id: req.body.order_id
          }, function  (err, order) {
              if (err) {
                next(err);
              } else if(order && order.cancel !== true) {
                //cancel the order
                order.cancel = true;

                var amt = order.total_amount;

                User.findOne({
                  id: order.user_id
                }, function  (err, user) {
                  if(err) { next(err) }
                  else if(user) {
                    //refund the credits
                    user.credits += amt;
                    user.save();

                    gcm(8, 'Order '+ req.body.order_id +' Cancelled',
                     'Your order has been Cancelled and credits refunded', user.gcm_id);

                    res.json({
                      err: false,
                      message: 'Order Cancelled'
                    })  
                  }  else {
                    res.json({
                      err: true,
                      message: 'No such user'
                    }) 
                  }
                })

                order.save();  
              } else {
                res.json({
                      err: true,
                      message: 'No such order or order already Cancelled'
                    }) 
              }
          })



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
