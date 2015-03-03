module.exports = function (id,mode) {
  
  var crypto = require('crypto');
  
  if(mode)
  {
    id = id.toString();

    id = crypto.randomBytes(16).toString('hex');

    var otp = id.slice(0,5);

    return otp;
  } 
}
