var mongoose = require('mongoose');

var moment = require('moment');

json2csv = require('json2csv');

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

exports.mailInfo = function (token) {
    Restaurant.findOne({
        "admin.token": token
    }, function (err, rest) {
        if(err) {
            throw new Error("Hell")
        }
        else if (rest) {
            Account(function (err, accountInfo) {
                console.log('Got sth', accountInfo);

                json2csv({
                     data: Account.records,
                     fields: ['id', 'name','phone', 'totalOrdered', 'totalCredited','credits']
                }, function (err, csv) {
                     if (err) {
                     console.log('Error occured', err);
                     }
                     else {
                         console.log(csv)
                         fs.writeFile('Account.csv', csv, function (err) {
                         console.log(err);
                          mail(accountInfo);
                     })
                     }
                 })
            })
        }
    })
}

function mail (finalAccounts) {

    fs.readFile("Account.csv", function(err, data) {
        console.log(err)
        console.log('Data from file', data)

        var mailBody = "<br /> Account Summary: "+ curDate.calendar()  +"   <br /><br />" +
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