var mailer = function  (email, message, callback) {

  var nodemailer = require('nodemailer');
	var smtpTransport = require('nodemailer-smtp-transport');

	var transporter = nodemailer.createTransport(smtpTransport({
		host: 'smtp.mandrillapp.com', //for mandrill smtp.mandrillapp.com
		port: 587, // for mandrill 587
		auth: {
			user:'ashakdwipeea@gmail.com',
			pass:'Dfhacm-zBJ6Jo4vcuFxzhA'
		}
	}));

	var mailOptions = {
		from: " 'Viands App' <ashakdwipeea@gmail.com>",
		to: email,
		subject: 'Hi',
		html: message
	};

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
