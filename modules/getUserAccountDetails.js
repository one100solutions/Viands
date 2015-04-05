/**
 * Created by akash on 3/4/15.
 */
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

var UserAccount =  {

    userId: null,

    phone: null,

    _getOrders: function (phone, callback) {
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
    },

    _getCredits: function (phone, callback) {
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
    },

    getUserId: function (token, callback) {
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

                this.userId = user.id;
                this.phone = user.phone;

                callback(response);
            }

            else
            {
                response.message = 'No such user';
                callback(response);
            }
        })
    },

    getOrders: function (token, callback) {

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
    },

    getCredits: function (token , callback) {

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

    },

    getOrderAndCredits: function (token, finalCallback) {
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
};

module.exports = UserAccount;
