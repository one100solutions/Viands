(function() {
  var Credits, Orders, async, credit, credited, mongoose, omitPhone, order, ordered;

  mongoose = require('mongoose');

  console.log('A');

  require('../app');

  require('../models/OrderSchema');

  require('../models/CreditSchema');

  Orders = mongoose.model('Order');

  Credits = mongoose.model('Credit');

  async = require('async');

  ordered = [];

  credited = [];

  omitPhone = [8970707712, 8277564501, 9986787295, 7411487928, 9482532445, 7259281007];

  order = function(callback) {
    return Orders.find({}, function(err, orders) {
      var i, len;
      if (err) {
        throw new Error("Error occured", err);
      }
      for (i = 0, len = orders.length; i < len; i++) {
        order = orders[i];
        if (omitPhone.indexOf(order.phone) < 0) {
          credited.push({
            phone: order.phone,
            total: order.total_amount
          });
        }
      }
      return callback(null, ordered);
    });
  };

  credit = function(callback) {
    return Credits.find({}, function(err, credits) {
      var i, len;
      if (err) {
        throw new Error("Error occured", err);
      }
      for (i = 0, len = credits.length; i < len; i++) {
        credit = credits[i];
        if (omitPhone.indexOf(credit.phone) < 0) {
          ordered.push({
            phone: credit.phone,
            amount: credit.amount
          });
        }
      }
      return callback(null, credited);
    });
  };

  async.parallel([order, credit], function(err, results) {
    console.log('results', results);
    return process.exit(0);
  });

}).call(this);
