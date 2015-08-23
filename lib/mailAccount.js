var mongoose = require('mongoose');

var moment = require('moment');

var json2csv = require('json2csv');

var AccountInfo = require('../modules/getUserAccountDetails');

var Account = require('./account_generator').AccountGenerator;

var fs = require('fs');

require('../app');

require('../models/OrderSchema');

require('../models/CreditSchema');

require('../models/UserSchema')

require('../models/RestaurantSchema')

var Orders = mongoose.model('Order');

var Credits = mongoose.model('Credit');

var User = mongoose.model('User');

var Restaurant = mongoose.model('Restaurant');

var message = require('./template_account');

var mailer = require('./mailer');

var async = require('async');

var Handlebars = require('handlebars');

var _ = require('underscore');

var curDate = moment();
//var curDate = moment();

exports.mailInfo = function (token, dateForAccount) {
    if (dateForAccount) {
        curDate = moment([dateForAccount.year, dateForAccount.month - 1, dateForAccount.day]);
    }
    
    
    Restaurant.findOne({
        "admin.token": token
    }, function (err, rest) {
        if(err) {
            throw new Error("Hell")
        }
        else if (rest) {
            Account(dateForAccount, function (err, accountInfo) {
                console.log('Got sth', accountInfo);

                var Order = [];
                accountInfo.orders.forEach(function  (order) {
                    order.items.forEach(function  (item) {
                        var t = {};
                        t.foodName = item.name;
                        t.quantity = item.quantity;
                        t.amount = order.amount;
                        t.time = order.time;
                        Order.push(t);
                    })
                })

                json2csv({
                     data: Order,
                     fields: [ 'foodName', 'quantity', 'amount', 'time']
                }, function (err, csv) {
                     if (err) {
                     console.log('Error occured', err);
                     }
                     else {
                         console.log(csv)
                         
                         csv += "\n\n\n,,Field , Value\n ,,Ordered Today," + accountInfo.totalOrdered + "\n ,, Recharged Today," + accountInfo.totalCredited;  
                         
                         fs.writeFile(__dirname + '/../data/' + curDate.format("dddd, MMMM Do YYYY") + "_orders.csv", csv, function (err) {
                         console.log(err);
			             if(err) throw err
                          mail(accountInfo);
                     })
                     }
                 })

                json2csv({
                     data: accountInfo.credits,
                     fields: ['phone', 'amount', 'time']
                }, function (err, csv) {
                     if (err) {
                     console.log('Error occured', err);
                     }
                     else {
                         console.log(csv)
                         
                         csv += "\n\n\n,,Field , Value\n ,,Ordered Today," + accountInfo.ordered + "\n ,, Recharged Today," + accountInfo.credited + "\n ,,Total Ordered," + accountInfo.totalOrdered + "\n ,, Total Recharged," + accountInfo.totalCredited;  
                         
                         fs.writeFile(__dirname + '/../data/' + curDate.format("dddd, MMMM Do YYYY") + "_credits.csv", csv, function (err) {
                         console.log(err);
                         if(err) throw err
                          mail(accountInfo);
                     })
                     }
                 })
            })
        }
    })
}

function mail (finalAccounts) {

    fs.readFile(__dirname + '/../data/' + curDate.format("dddd, MMMM Do YYYY") + "_orders.csv", function(err, data) {
        console.log(err)
        console.log('Data from file', data)

        var mailBody = "<br /> Account Summary: "+ curDate.format("dddd, MMMM Do YYYY") +"   <br /><br />" +
            " <table><tr><th>Field</th><th>Value</th></tr>"+
            "<tr><td>Total Ordered</td><td>{{totalOrdered}}</td></tr>" +
            "<tr><td>Total Recharged</td><td>{{totalCredited}}</td></tr>" +
            "</table> <br /> <p> For detailed summary of today , find the attachment</p>";


        var template = Handlebars.compile(message(mailBody,""))

        var Acc = finalAccounts;

        delete Acc.records;

        console.log(template(Acc))

	var attachFile = {};
	attachFile.name = curDate.format("dddd, MMMM Do YYYY") + "_orders.csv";
	attachFile.data = data;

        var attachFile2 = {};
    attachFile2.name = curDate.format("dddd, MMMM Do YYYY") + "_credits.csv";
    attachFile2.data = fs.readFileSync(__dirname + '/../data/' + curDate.format("dddd, MMMM Do YYYY") + "_credits.csv");

    var files = [];
    files = [attachFile, attachFile2];

        mailer('ashakdwipeea@gmail.com',template(Acc), files, function (Err, Success) {
            console.log(Err, Success);
        })
    })
}
