(function() {
  var Order, Restaurant, express, mongoose, router, moment;

  express = require('express');

  router = express.Router();

  mongoose = require('mongoose');

  Order = mongoose.model('Order');

  moment = require('moment');

  Restaurant = mongoose.model('Restaurant');

  router.post('/', function(req, res) {
    if (req.body.token) {
      return Restaurant.findOne({
        'admin.token': req.body.token
      }, function(err, restaurant) {
        if (err) {
          return res.json({
            err: true,
            message: err
          });
        } else if (restaurant) {
          return Order.find({
            restaurant_id: restaurant._id,
            complete: false
          }, function(err, orders) {
            if (err) {
              return res.json({
                err: true,
                message: err
              });
            } else if (orders) {
              console.log('Orders receive', orders)

              //filter records take only what is applicable 
              var now = new moment().add(5, 'hours').add(43, 'minutes');
              console.log("Now",now.format());

              //order can come before 10 minutes
              //now.subtract(10,'minutes');

              //filter the orders
              orders = orders.filter(function  (order) {

                if(order.cancel === true) {
                  return false;
                }
                else if (order.type === 'later') {
                  var order_time = new moment(order.time_deliver,'HH:mm').subtract(10,'minutes');
                  console.log("Order",order_time.format())
                  if (order_time.isBefore(now) || order_time.isSame(now)) {
                    return true;
                  } else {
                    return false;
                  }  
                } else {
                  return true;
                }
                
              })

              console.log("After filter", orders)

              return res.json({
                err: false,
                message: 'Orders found',
                orders: orders
              });
            } else {
              return res.json({
                err: true,
                message: 'No Orders'
              });
            }
          });
        } else {
          return res.json({
            err: true,
            message: 'Restaurant not found'
          });
        }
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
