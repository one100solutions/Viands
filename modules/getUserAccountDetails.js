/**
 * Created by akash on 3/4/15.
 */


require('../app')

require('../models/UserSchema')

require('../models/OrderSchema');

require('../models/CreditSchema');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Credit = mongoose.model('Credit');

var async = require('async');


var sortMomentDates = require('../lib/sortDate')
var _ = require('underscore');

var response = {
    err: true,
    message: 'Pristine'
}

var UserAccount =  function () {
    this.userId = null;
    this.name = null;
    this.phone =  null;
}

UserAccount.prototype.getUser = function (Phone, callback) {
    User.findOne({
        phone: Phone
    }, function (err, user) {
        if(!err) {
            return callback(user);
        }
        else {
            return callback(null);
        }
    })
}

UserAccount.prototype._getOrders =  function (phone, callback) {
    Order.find({
        phone: phone
    }, function (err, orders) {
        if (err) {
            console.log('Error', err);
        }

        else if (orders) {
            response.err = false;
            response.message = 'Orders found';
            response.orders = orders;
        }

        console.log('Res', response,'Id', this.userId)

        callback(response);

    })
};

UserAccount.prototype._getCredits =  function (phone, callback) {
    Credit.find({
        phone: phone
    }, function (err, credits) {
        if(err)
        {
            console.log('Error', err);
        }

        else if (credits)
        {
            response.err = false;
            response.message = 'Orders found';
            response.credits = credits;
        }

        callback(response);

    })
}

UserAccount.prototype.getUserId = function (token, callback) {

    var ref = this;
    User.findOne({
        token: token
    }, function (err, user) {
        if(err)
        {
            console.log('Error',err);
            response.message = err;
            callback(response);
        }

        else if (user)
        {
            response.err = false;
            response.message = 'User found';

            ref.userId = user.id;
            ref.phone = user.phone;
            ref.name = user.name;

            callback(response);
        }

        else
        {
            response.message = 'No such user';
            callback(response);
        }
    })
}

UserAccount.prototype.getOrders = function (token, callback) {

    if(this.userId)
    {
        this._getOrders(this.phone,function (response) {
            callback(response);
        })
    }
    else {
        var that = this;
        this.getUserId(token, function (response) {
            if (response.err === false) {
              console.log("Phone", this.phone);
              that._getOrders(this.phone, function (response) {
                  console.log('Rig', response);
                   callback(response);
               })
            }
            else {
                console.log('Reqq',response);
                callback(response);
            }


        })
    }
}

UserAccount.prototype.getCredits = function (token , callback) {

    if(this.phone)
    {
        this._getCredits(this.phone, function (response) {
            callback(response);
        })
    }

    else
    {
        var ref = this;
        this.getUserId(token, function (response) {
            if(response.err === false)
            {
                ref._getCredits(ref.phone, function (response) {
                    callback(response);
                })
            }

            else
            {
                callback(response);
            }
        })
    }

}

UserAccount.prototype.getOrderAndCredits = function (token, finalCallback) {
    var ref = this;
    async.parallel([
        function (callback) {
            ref.getOrders(token, function (response) {
                if(response.err === false)
                {
                    console.log('Orders are', response);
                    callback(null,response);
                }
                else
                {
                    console.log('Err', response.err);
                    callback(true, response);
                }
            })
        },
        function (callback) {
            ref.getCredits(token, function (response) {
                if(response.err === false)
                {
                    callback(null,response);
                }
                else
                {
                    console.log('ErrorL', response.err);
                    callback(true, response);
                }
            })
        }
    ], function (err, results) {
        if(err)
        {
            console.log('Error occured', err);
            response.err = true;
            response.message = "Error"
            finalCallback(response);
        }
        else
        {
            response.err = false;
            response.message = 'All is well';
            var finalArray = _.union(response.orders, response.credits);
            finalArray = sortMomentDates(finalArray);
            response.final = finalArray;
            //response.results = results;
            finalCallback(results);
        }
    });
}

module.exports = new UserAccount();
