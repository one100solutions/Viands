(function() {
  module.exports = function(to, message, callback) {
    var request;
    request = require('request');
    return request.get("https://control.msg91.com/api/sendhttp.php?authkey=81123A0Lic9Q63l5505c468&mobiles=" + to + "&message=" + message + "&sender=Viands&route=template", function(status, response, body) {
      console.log('Body is', body);
      console.log('Status', status);
      return callback(false, body);
    });
  };

}).call(this);
