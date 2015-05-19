/**
 * Created by akash on 17/4/15.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

var Account = require('../../lib/account_generator').AccountGenerator;

router.post('/', function (req, res, next) {
    if(req.body.token) {
        Restaurant.findOne({
            "admin.token": req.body.token
        }, function (err, rest) {
            if(err) {
                next(err);
            }
            else if (rest) {
                Account(null, function (err, accountInfo) {
                    console.log('Got sth', accountInfo);
                    res.json({
                        err: false,
                        message: 'Confidential Message!',
                        account: accountInfo
                    })
                })
            }
            else {
                res.json({
                    err: true,
                    message:'Hey! ur off the records..!!'
                })
            }
        })
    }
    else {
        res.json({
            err: true,
            message: 'Well! Ur not providing credentials.'
        })
    }
})

module.exports = router;