/**
 * Created by akash on 17/7/15.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function (req, res) {
    if (req.body.token) {
        User.findOne({
            token: req.body.token
        }, function (err, user) {
            if(err) {
                res.json({
                    err: true,
                    msg: err
                });
            }

            else if (user) {
                user.email = req.body.email;
                user.name = req.body.name;
                user.password = req.body.password;

                user.save(function (err, user) {
                    if(err) {
                        res.json({
                            err: true,
                            msg: err
                        });
                    }

                    else {
                        res.json({
                            err: false,
                            msg: 'Profile updated',
                            user: user
                        });
                    }
                });
            }

            else {
                res.json({
                    err: true,
                    msg: 'User not found'
                });
            }
        });
    }
    else {
        res.json({
            err: true,
            msg: 'No parameters'
        });
    }
});

module.exports = router;