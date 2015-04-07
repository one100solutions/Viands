var mailer = function  (email, message, attachFile, callback) {

  var nodemailer = require('nodemailer');
	var smtpTransport = require('nodemailer-smtp-transport');

	var transporter = nodemailer.createTransport(smtpTransport({
		host: 'smtp.mandrillapp.com', //for mandrill smtp.mandrillapp.com
		port: 587, // for mandrill 587
		auth: {
			user:'noreply@viands.in',
			pass:'9Uoe6iaI1Oe6ocAikIt2lA'
		}
	}));

	console.log('Message',message);

	var mailOptions = {
		from: " 'Viands App' <noreply@viands.in>",
		to: email,
		subject: 'Welcome to Viands',
		html: message
	};

	if(attachFile) {
		console.log('Content',attachFile)
		mailOptions.attachments = [{'filename': 'Account.csv', 'content': new Buffer(attachFile, 'utf-8')}];
	}

  var err_mail;

	transporter.sendMail(mailOptions,function  (error,info) {
		if (error) {
			console.log('Error occured while sending msail',error);

      err_mail: true;

      response = {
        message: 'Uh oh!! Technical glitches....'
      };

		} else {
			console.log('Message sent: ' + info.response);

      err_mail: false;

      response = {
        message: 'Verification Mail Sent!'
      };
		}

    callback(err_mail,response);
	});
}

module.exports = mailer;
