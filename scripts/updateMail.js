var mailer = require('../lib/mailer');
var EmailTemplate = require("email-templates").EmailTemplate;
var path = require('path');

var mongoose = require('mongoose');

require('../app');
require('../models/UserSchema');

var User = mongoose.model('User');

var templatesDir = path.join(__dirname,'/../','templates','update-email');

console.log(templatesDir);
var updateMailTemplate = new EmailTemplate(templatesDir);

var sent = 0;
var total = 0;

updateMailTemplate.render(function  (err, res) {
	var html_text = res.html;
	//console.log(html_text);
	
	User.find({}, function  (err, users) {
		console.log("Total", users.length);
		total = users.length;

		users.forEach(function  (user) {
			mailer(user.email, html_text,
	 			null, function  (err, info) {
	 				sent++;
	 				console.log("Err", err, "Info", info);
	 				console.log("sent", sent, "Total", total);

	 				if (sent == total) {
	 					console.log("All Done");
	 				}
				})
			})
	})


})