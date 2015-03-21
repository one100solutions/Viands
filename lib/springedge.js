(function() {
  module.exports = function(to, message, callback) {
    var request;
    request = require('request');
    return request.get("http://alerts.springedge.com/api/v3/index.php?method=sms&api_key=A2fd82469ec2e10c8f5f8e38ecbb211b3&to=" + to + "&sender=VIANDS&message=" + message + "&format=json&custom=1,2&flash=0", function(status, response, body) {
      return callback(false, body);
    });
  };

}).call(this);
