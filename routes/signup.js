var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');

var mailer = require('../lib/mailer');
var messenger = require('../lib/messenger');
var host = require('../lib/host');
var id2otp = require('../lib/id2otp');
var tokenize = require('../lib/tokenize');

router.post('/', function (req,res) {

  var done = 0;
  var newUser;

  User.findOne({
    phone: req.body.phone
  }, function (err, user) {
    if (err) {

      console.log('Error occured',err);

      res.json({
        err: true,
        message: 'Uh Oh! Error occured!!'
      })
    } else if(!user){
      if (req.body.phone && req.body.email) {

        req.body.id = new mongoose.Types.ObjectId;
        req.body.validation = false;

        var otp = id2otp(req.body.id,true);
        console.log(otp);
        req.body.otp = otp;

        req.body.credits = 0;

        req.body.password = tokenize(req.body.password)

        newUser = new User(req.body);

        mailer(req.body.email, "Welcome to Viands", receiver);

        messenger(req.body.phone,'Otp is ' + otp, receiver);

       newUser.save();

        res.json({
          err: false,
          mesage: 'Account created. Verification message sent'
        });
      }
      else {
        res.json({
          err: true,
          message:'Missing email or phone'
        })
      }

    }
    else if(user){
      res.json({
        err: true,
        message:'Id taken!!'
      })
    }

    function receiver(err,info) {
      if(err) {
        console.log('Error',err);
        console.log('Info',info)
        res.json({
          message: 'Error occured'
        })
      } else {
        done++;
        if (done === 2) {
          console.log('email AND MESSAGE sent');
        }
      }
    }
  })
});

module.exports = router
