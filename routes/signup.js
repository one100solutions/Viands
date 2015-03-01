var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');

var mailer = require('../utility/mailer');
var messenger = require('../utility/messenger');
var host = require('../utility/host');

router.post('/', function (req,res) {

  var done = 0;
  var newUser;

  User.findOne({
    email: req.body.email
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
        newUser = new User(req.body);

        var id = req.body.id.toString();

        var otp = id.slice(0,5);

        console.log(otp);

        mailer(req.body.email, "Welcome to Viands", receiver);

        messenger(req.body.phone,'Otp is ' + otp, receiver);
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

          newUser.save();

          res.json({
            err: true,
            mesage: 'Account created. Verification message sent'
          });


        }
      }
    }
  })
});

module.exports = router
