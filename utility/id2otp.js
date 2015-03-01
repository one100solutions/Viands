module.exports = function (id,mode) {
  if(mode)
  {
    id = id.toString();

    var otp = id.slice(0,5);

    return otp;
  } 
}
