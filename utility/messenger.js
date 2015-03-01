module.exports = function(to, message, callback) {

  to = '+91' + to;

  // Twilio Credentials
  var accountSid = 'ACa163761c6f90377f4e1d9a3692e021be';
  var authToken = '754bfbf6b27ff7a7494939e71c573a23';

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  var err_sms, response;

  client.messages.create({
  	from: "+16617946962",
    to: to,
    body: message
  }, function(err, message) {
    if(err) {
      console.log(err);
      err_sms = true;
      response = {
        message_sms: err
      }
    } else {
         err_sms: false
    }

    callback(err_sms, response);
  });

}
