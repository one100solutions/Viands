(function() {
  var CreditSumHistory, Credits, OrderSumHistory, Orders, _, async, credit, credited, creditsString, mailer, message, moment, mongoose, omitPhone, order, ordered, ordersString;

  mongoose = require('mongoose');

  moment = require('moment');

  console.log('A');

  require('../app');

  require('../models/OrderSchema');

  require('../models/CreditSchema');

  Orders = mongoose.model('Order');

  Credits = mongoose.model('Credit');

  message = require('./template_account');

  mailer = require('./mailer');

  async = require('async');

  _ = require('underscore');

  credited = [];

  ordered = [];

  omitPhone = [8970707712, 8277564501, 9986787295, 7411487928, 9482532445, 7259281007];

  ordersString = '<br /> Order History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />';

  creditsString = '<br /> Credit History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />';

  OrderSumHistory = 0;

  CreditSumHistory = 0;

  order = function(callback) {
    return Orders.find({}, function(err, orders) {
      var curDate, dbDate, j, len;
      if (err) {
        throw new Error("Error occured", err);
      }
      for (j = 0, len = orders.length; j < len; j++) {
        order = orders[j];
        if (omitPhone.indexOf(order.phone) < 0) {
          OrderSumHistory += order.total_amount;
          curDate = moment();
          dbDate = moment(order.time, "dddd, MMMM Do YYYY, h:mm:ss a");
          if (curDate.diff(dbDate, 'days') === 0) {
            ordered.push({
              phone: order.phone,
              total: order.total_amount,
              time: order.time
            });
          }
        }
      }
      return callback(null, ordered);
    });
  };

  credit = function(callback) {
    return Credits.find({}, function(err, credits) {
      var curDate, dbDate, j, len;
      if (err) {
        throw new Error("Error occurred", err);
      }
      for (j = 0, len = credits.length; j < len; j++) {
        credit = credits[j];
        curDate = moment();
        dbDate = moment(credit.time, "dddd, MMMM Do YYYY, h:mm:ss a");
        if (omitPhone.indexOf(credit.phone) < 0) {
          CreditSumHistory += credit.amount;
          if (curDate.diff(dbDate, 'days') === 0) {
            credited.push({
              phone: credit.phone,
              amount: credit.amount,
              time: credit.time
            });
          }
          creditsString += credit.phone + " &nbsp;&nbsp;&nbsp;&nbsp; " + credit.amount + " &nbsp;&nbsp;&nbsp;&nbsp; " + credit.time + " <br />";
        }
      }
      return callback(null, credited);
    });
  };

  async.parallel([order, credit], function(err, results) {
    var _phone, _totalCredited, _totalOrdered, final, finalAccounts, i, j, len, newObj, reduceHelper, totalCreditSum, totalOrderSum, uniqueObjectCredit, uniqueObjectOrder, uniquePhone, uniquePhoneCredited, uniquePhoneOrdered;
    ordered = _.sortBy(ordered, 'phone');
    credited = _.sortBy(credited, 'phone');
    i = 0;
    totalOrderSum = 0;
    totalCreditSum = 0;
    uniquePhoneOrdered = _.uniq(_.pluck(ordered, 'phone'), true);
    uniquePhoneCredited = _.uniq(_.pluck(credited, 'phone'), true);
    uniquePhone = _.union(uniquePhoneCredited, uniquePhoneOrdered);
    finalAccounts = [];
    for (j = 0, len = uniquePhone.length; j < len; j++) {
      _phone = uniquePhone[j];
      uniqueObjectOrder = _.where(ordered, {
        'phone': _phone
      });
      uniqueObjectCredit = _.where(credited, {
        'phone': _phone
      });
      newObj = {
        phone: _phone
      };
      reduceHelper = function(memo, num) {
        return memo + num;
      };
      _totalOrdered = _.reduce(_.pluck(uniqueObjectOrder, 'total'), reduceHelper, 0);
      _totalCredited = _.reduce(_.pluck(uniqueObjectCredit, 'amount'), reduceHelper, 0);
      totalOrderSum += _totalOrdered;
      totalCreditSum += _totalCredited;
      newObj.totalOrdered = _totalOrdered;
      newObj.totalCredited = _totalCredited;
      finalAccounts.push(newObj);
      newObj = null;
    }
    finalAccounts.ordered = totalOrderSum;
    finalAccounts.credited = totalCreditSum;
    finalAccounts.totalOrdered = OrderSumHistory;
    finalAccounts.totalCredited = CreditSumHistory;
    console.log(finalAccounts);
    final = message(ordersString, creditsString);
    return process.exit(0);
  });


  /*
    mailer 'sidsb94@gmail.com', final, (err, response) ->
    console.log 'response', response
   */

}).call(this);
