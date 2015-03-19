(function() {
  var crypto;

  crypto = require('crypto');

  module.exports = function(str) {
    return crypto.pbkdf2Sync(str, '58ebe06f45d40e1c9b8918fd559bb418', 4096, 512, 'sha256').toString('hex');
  };

}).call(this);
