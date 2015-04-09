(function() {
    var CreditSumHistory, AccountInfo, Credits, OrderSumHistory, Orders, _, async, credit, credited, creditsString, fastCsv, fs, json2csv, createCsv, mailer, message, moment, mongoose, omitPhone, order, ordered, ordersString;

    mongoose = require('mongoose');

    moment = require('moment');

    json2csv = require('json2csv');

    AccountInfo = require('../modules/getUserAccountDetails');

    //fastCsv = require('fast-csv');

    fs = require('fs');

    console.log('A');

    require('../app');

    require('../models/OrderSchema');

    require('../models/CreditSchema');

    require('../models/UserSchema')

    Orders = mongoose.model('Order');

    Credits = mongoose.model('Credit');

    User = mongoose.model('User');

    message = require('./template_account');

    mailer = require('./mailer');

    async = require('async');

    var Handlebars = require('handlebars');

    _ = require('underscore');

    credited = [];

    ordered = [];

    omitPhone = [8970707712, 9986787295, 7411487928, 9482532445, 7259281007];

    ordersString = '<br /> Order History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />';

    creditsString = '<br /> Credit History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />';

    OrderSumHistory = 0;

    CreditSumHistory = 0;

    var finalAccounts = {};

    var curDate = moment();

    order = function(callback) {
        return Orders.find({}, function(err, orders) {
            var  dbDate, j, len;
            if (err) {
                throw new Error("Error occured", err);
            }
            for (j = 0, len = orders.length; j < len; j++) {
                order = orders[j];
                if (omitPhone.indexOf(order.phone) < 0) {
                    OrderSumHistory += order.total_amount;
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
            var  dbDate, j, len;
            if (err) {
                throw new Error("Error occurred", err);
            }
            for (j = 0, len = credits.length; j < len; j++) {
                credit = credits[j];
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

    createCsv = function(Account) {

        /*totalOrderToday = Account.ordered
         totalCreditToday = Account.credited
         totalOrder = Account.totalOrdered
         totalCredit = Account.totalCredited
         */
        var final, j, len, mailString, mailString2, ref;
        console.log(Account.records);

        var JsonAccount = JSON.stringify(Account.records)
        console.log('JSONed', JsonAccount)

        json2csv({
            data: Account.records,
            fields: ['id', 'name', 'phone', 'totalOrdered', 'totalCredited', 'credits']
        }, function (err, csv) {
            if (err) {
                console.log('Error occured', err);
            }
            else {
                console.log(csv)
                fs.writeFile('Account.csv', csv, function (err) {
                    console.log(err);
                    mail();
                })
            }
        })
    };

    async.parallel([order, credit], function(err, results) {
        var _phone, _totalCredited, _totalOrdered, i, j, len, newObj, reduceHelper, totalCreditSum, totalOrderSum, uniqueObjectCredit, uniqueObjectOrder, uniquePhone, uniquePhoneCredited, uniquePhoneOrdered;

        ordered = _.sortBy(ordered, 'phone');
        credited = _.sortBy(credited, 'phone');

        i = 0;
        totalOrderSum = 0;
        totalCreditSum = 0;

        uniquePhoneOrdered = _.uniq(_.pluck(ordered, 'phone'), true);
        uniquePhoneCredited = _.uniq(_.pluck(credited, 'phone'), true);

        uniquePhone = _.union(uniquePhoneCredited, uniquePhoneOrdered);
        finalAccounts = {};
        finalAccounts.records = [];

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

            getUserInfo(newObj, i === uniquePhone.length - 1);

            newObj = null;
        }

        finalAccounts.ordered = totalOrderSum;
        finalAccounts.credited = totalCreditSum;
        finalAccounts.totalOrdered = OrderSumHistory;
        finalAccounts.totalCredited = CreditSumHistory;

        console.log('Final', finalAccounts)

    });

    function mail () {

        fs.readFile("Account.csv", function(err, data) {
            console.log(err)
            console.log('Data from file', data)

            var mailBody = "<br /> Account Summary: <br /><br />" +
                " <table><tr><th>Field</th><th>Value</th></tr>" +
                "<tr><td>Ordered Today</td><td>{{ordered}}</td></tr>" +
                "<tr><td>Recharged Today</td><td>{{credited}}</td></tr>" +
                "<tr><td>Total Ordered</td><td>{{totalOrdered}}</td></tr>" +
                "<tr><td>Total Recharged</td><td>{{totalCredited}}</td></tr>" +
                "</table> <br /> <p> For detailed summary of today , find the attachment</p>";


            var template = Handlebars.compile(message(mailBody,""))

            var Acc = finalAccounts;

            delete Acc.records;

            console.log(template(Acc))

            mailer('ashakdwipeea@gmail.com',template(Acc), data, function (Err, Success) {
                console.log(Err, Success);
                process.exit(0)
            })
        })
    }

    function getUserInfo (userObj, count) {
        console.log(count)
       /* AccountInfo.getUser(userObj.phone, function(value) {
            if(value) {
                userObj.name = value.name;
                userObj.id = value.id;
                userObj.credits = value.credits;
            }

            console.log(typeof finalAccounts)
            finalAccounts.records.push(userObj)

            if(count) {
                createCsv(finalAccounts);
            }

        })*/

        User.findOne({
            phone: userObj.phone
        }, function (Err, user) {
            if(Err){
                console.log(Err);
                throw new Error("GOne")
            } else {
                userObj.name = user.name;
                userObj.id = user.id;
                userObj.credits = user.credits;

                finalAccounts.records.push(userObj)

                if(count) {
                    createCsv(finalAccounts)
                }

            }
        })



    }


    /*
     mailer 'sidsb94@gmail.com', final, (err, response) ->
     console.log 'response', response
     */

}).call(this);