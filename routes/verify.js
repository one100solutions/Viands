var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');
var id2otp = require('../lib/id2otp');

var debug = require('debug')('verify');

router.post('/', function (req, res) {

  console.log('Request body', req.body)

  if(req.body.phone && req.body.otp)
  {
    User.findOne({
      phone: req.body.phone,
      otp: req.body.otp
    }, function (err,user) {
      if (err)
      {
        console.log(err);
        res.json({
          err: true,
          message: err
        });
      }
      else if (!user)
      {
        res.json({
          err: true,
          message: 'Phone number not registered or Incorrect otp'
        });
      }
      else if (user)
      {
        user.validation = true;
        user.save();

        res.json({
          err: false,
          message: 'Phone number verified. Good to go'
        });
      }
    })
  }
  else
  {
    res.json({
      err: true,
      message: 'Missing Parameters!'
    });
  }
});

module.exports = router;
