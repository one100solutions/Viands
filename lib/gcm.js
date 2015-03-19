(function() {
  var node_gcm;

  node_gcm = require('node-gcm');

  module.exports = function(message, regId) {
    var msg, regIds, sender;
    msg = new node_gcm.Message();
    msg.addData('key1', 'message1');
    regIds = ['APA91bFcBJIJCAHDfdFoQGgKPtbxE1yBrxuanRTAAI0Z3RnLvldOciRq5O1HNL3LolWwv-JWqwTPPOLBke3QGHCh8cST4jOUxUkVYGqpUSNCM9c03Smp6fCuvolCRFej75uP6_of33eK1rfYohh-fJLqyN-onZDgcEDEFS6SaQuMQ9oSBUEgqYU'];
    sender = new node_gcm.Sender('AIzaSyDgz6cuPL0VYwFVXiBcdn1N8FLUwq7QblM');
    return sender.send(msg, regIds, function(err, result) {
      if (err) {
        return console.log('Error', err);
      } else {
        return console.log('Result:', result);
      }
    });
  };

}).call(this);
