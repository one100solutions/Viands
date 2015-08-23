(function() {
  var Restaurant, express, mongoose, router, Order;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Restaurant = mongoose.model('Restaurant');
  Order = mongoose.model('Order');

  var request = require('request');
var gcm = require('../../lib/gcm');


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

            if(req.body.close === "true") {
		        console.log("Calling mailer");
              //  MailAccount.mailInfo(restaurant.admin.token, null);
            }

            //cancel all the preorders
            
            Order.find({
              type: 'later',
              delivered: false,
              complete: false,
              cancel: false
            },function  (err, orders) {
              if (err) {
                console.log('Mahanta',err)
                return
              } else if(orders && orders.length > 0) {
                orders.forEach(function  (order) {
                  order.cancel = true;

                  var amt = order.total_amount;

                  User.findOne({
                    id: order.user_id
                  }, function  (err, user) {
                    if(err) { console.log(err) }
                    else if(user) {
                      //refund the credits
                      user.credits += amt;
                      user.save();

                      gcm(4, 'Order '+ req.body.order_id +' Cancelled',
                       'Your order has been Cancelled and credits refunded', user.gcm_id);
                    }
                  })

                  order.save(); 
                });

              } else {
                console.log("No orders");
              }
            })

          restaurant.close = req.body.close;
          console.log(typeof req.body.close);
          return restaurant.save(function(err) {
            if (err) {
              return res.json({
                err: true,
                message: 'Error occurred'
              });
            } else {

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
