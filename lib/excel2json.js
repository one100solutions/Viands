(function() {
  module.exports = function(path2xlsx, callback) {
    var xlsxj;
    xlsxj = require('xlsx-to-json');
    return xlsxj({
      input: path2xlsx,
      output: null
    }, function(err, result) {
      if (err) {
        return callback({
          err: true,
          message: err
        });
      } else if (result) {
        return callback({
          err: false,
          message: result
        });
      }
    });
  };

}).call(this);
