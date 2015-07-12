var express = require('express');
var router = express.Router();
var mailer = require('../../lib/mailer');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var path = require('path');
var EmailTemplate = require("email-templates").EmailTemplate;
var templatesDir = __dirname +  '/../../templates/' + 'forgot-password';
/**
*
* todo add reset password
*todo   add handler for reset password
**/

var url = "http://localhost/reset?id=";

function mailLink (email, text, cb) {
    mailer(email, text, null, function (err, info) {
        if(err) {
            cb(err);
        }
        else {
            cb(null);
        }
    });
}


router.post('/', function  (req, res) {
	if (req.body.email) {

        var resetPasswordTemplate = new EmailTemplate(templatesDir);

        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if(err) {
                res.json({
                    err: true,
                    msg: err
                });
            }

            else if(!user) {
                res.json({
                    err: true,
                    msg: err
                });
            }

            else {
                console.log(user);
                var userData = {
                    name: user.name,
                    link: url + user.token
                };

                console.log("User data", userData);

                resetPasswordTemplate.render(userData, function (err, results) {
                    if (err) {
                        res.json({
                            err: true,
                            msg: err
                        });
                    }
                    else {
                        console.log(results);
                        var htmlText = results.html;
                        mailLink(req.body.email, htmlText, function (err) {
                            if(err) {
                                res.json({
                                    err: true,
                                    msg:err
                                });
                            }
                            else {
                                res.json({
                                    err: false,
                                    msg: 'Mail Sent'
                                });
                            }
                        });
                    }
                });
            }
        });
	} else {
		res.json({
			err: true,
			msg: 'No email'
		});
	}


});

module.exports = router;