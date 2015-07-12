var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var tokenize = require('../../lib/tokenize');
var router = express.Router();

router.get('/', function (req, res) {
    console.log(req.query.id);
    res.render('forgot', {
        token: req.query.id
    });
});

router.post('/', function (req, res) {
   if(req.body.id && req.body.password) {
       User.findOne({
           token: req.body.id.replace(/ /g,'')
       }, function (err, user) {
           console.log(err, user);
           if(err) {
               res.json({
                   err: true,
                   msg: 'Error occured'
               });
           }

           else if (user) {
               user.password = tokenize(req.body.password);
               user.save(function (err) {
                  if (err) {
                       res.json({
                          err: true,
                          msg: 'Error'
                       });
                  } else {
                      res.json({
                          err: false,
                          msg: 'Password reset'
                      });
                  }
               });
           }

           else {
               res.json({
                   err: true,
                   msg: "This url is no longer valid"
               });
           }
       });
   }
    else {
       res.json({
           err: true,
           msg: 'Missing params'
       });
   }
});

module.exports = router;