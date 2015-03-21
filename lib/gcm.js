(function() {
  var node_gcm;

  node_gcm = require('node-gcm');

  module.exports = function(message, regId) {
    var msg, regIds, sender;
    msg = new node_gcm.Message();
    msg.addData('key1', 'message1');
    regIds = ['APA91bEYhgyaBcMfbRhMcelxGHIJVcEBGl32tWEQ2i43NcKcB-E4gpPZzTMLRqBKSh0KYH0ZVctSbAVzrKWhrde-ovEKUMYgGY_gAkfENpHfldlD-Aw-3OupK_YvybkxeQaVJ48nsEk92i3RXdPkIJtfQW-HV5ySlmqN21ALIr8fkU4HaRFoHZI'];
    sender = new node_gcm.Sender('AIzaSyDhBIeT9V1BIsDgHlrVDg2ErC4r6H2wSMM');
    return sender.send(msg, regIds, function(err, result) {
      if (err) {
        return console.log('Error', err);
      } else {
        return console.log('Result:', result);
      }
    });
  };

}).call(this);
