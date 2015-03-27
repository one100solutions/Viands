(function() {
  var Credits, Orders, async, credit, credited, creditsString, mailer, message, mongoose, omitPhone, order, ordered, ordersString;

  mongoose = require('mongoose');

  console.log('A');

  require('../app');

  require('../models/OrderSchema');

  require('../models/CreditSchema');

  Orders = mongoose.model('Order');

  Credits = mongoose.model('Credit');

  message = require('./template_account');

  mailer = require('./mailer');

  async = require('async');

  ordered = [];

  credited = [];

  omitPhone = [8970707712, 8277564501, 9986787295, 7411487928, 9482532445, 7259281007];

  ordersString = '\n Order History-\n Phone \t Amount \n';

  creditsString = '\n Credit History-\n Phone \t Amount \n';

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
            total: order.total_amount({
              time: order.time
            })
          });
          ordersString += order.phone + " \t " + order.amount + " \t " + order.time + "\n";
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
            amount: credit.amount({
              time: credit.time
            })
          });
          creditsString += credit.phone + " \t " + credit.amount + " \t " + credit.time + " \n";
        }
      }
      return callback(null, credited);
    });
  };

  async.parallel([order, credit], function(err, results) {
    var final;
    final = message(ordersString, creditsString);
    return mailer('sidsb94@gmail.com', final, function(err, response) {
      console.log('response', response);
      return process.exit(0);
    });
  });

}).call(this);
