var express = require('express');
var router = express.Router();
var mailer = require('mailer');

/**
*
* todo add reset password
*
**/


router.post('/', function  (req, res) {
	if (req.body.email) {
		mailer(req.body.email, template(), null, function function_name (err, info) {
			if(err) {
				res.json({
					err: true,
					msg: err
				});
			}
			else {
				res.json({
					err: false,
					msg: 'Recovery link sent to email'
				})
			}
		})
	} else {
		res.json({
			err: true,
			msg: 'No email'
		})
	}
})