/**
 * Created by akash on 9/4/15.
 */

require('../app')

require('../models/OrderSchema');

require('../models/CreditSchema');

require('../models/UserSchema');

var omitPhone = require('./omitPhone')

var mongoose = require('mongoose')
var moment = require('moment')


var Orders = mongoose.model('Order');

var Credits = mongoose.model('Credit');

var User = mongoose.model('User');

var Credit = function(curDate, callback) {
    console.log('a')
    console.log(omitPhone)
    Credits.find({}, function(err, credits) {
        var  dbDate, j, len, credit, CreditSumHistory = 0, credited = [];
        console.log('aa')
        if (err) {
            console.log(err)
            throw new Error("Error occurred", err);
        }
        for (j = 0, len = credits.length; j < len; j++) {
            credit = credits[j];
            dbDate = moment(credit.time, "dddd, MMMM Do YYYY, h:mm:ss a");
            if (omitPhone.indexOf(credit.phone) < 0) {
                CreditSumHistory += credit.amount;
                if (curDate.date() === dbDate.date()) {
                    credited.push({
                        phone: credit.phone,
                        amount: credit.amount,
                        time: credit.time
                    });
                }
                //creditsString += credit.phone + " &nbsp;&nbsp;&nbsp;&nbsp; " + credit.amount + " &nbsp;&nbsp;&nbsp;&nbsp; " + credit.time + " <br />";
            }
        }
        console.log('here')
        callback(null, credited, CreditSumHistory);
    });
};

var Order = function(curDate,callback) {
    Orders.find({}, function(err, orders) {
        var  dbDate, j, len, order, OrderSumHistory = 0, curDate = [];
        if (err) {
            console.log(err)
            throw new Error("Error occured", err);
        }
        for (j = 0, len = orders.length; j < len; j++) {
            order = orders[j];
            if (omitPhone.indexOf(order.phone) < 0) {
                OrderSumHistory += order.total_amount;
                dbDate = moment(order.time, "dddd, MMMM Do YYYY, h:mm:ss a");
                console.log('Cur',curDate.day(),'Db', dbDate.day());
                if (curDate.date() === dbDate.date()) {
                    ordered.push({
                        phone: order.phone,
                        total: order.total_amount,
                        time: order.time
                    });
                }
            }
        }
        callback(null, ordered, OrderSumHistory);
    });
};

module.exports = {
    getOrders: Order,
    getCredits : Credit
}