var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');

router.post('/', function (req,res) {
  if (req.body.phone && req.body.password)
  {
    User.findOne({
      phone: req.body.phone,
      password: req.body.password,
      validation: true
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
          message: 'User not found'
        });
      }
      else if (user)
      {
        user.token = user.phone + user.email + user.password;
        user.password = null;
        
        res.json({
          err: false,
          message: 'User found',
          user: user
        });
      }
    })
  }
  else
  {
    res.json({
      err: true,
      message: 'Missing parameters'
    })
  }
});

module.exports = router;
