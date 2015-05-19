(function() {
  var Restaurant, mongoose, rest, tokenize, x;

  x = require('./excel2json');

  mongoose = require('mongoose');

  require('../app');

  require('../models/RestaurantSchema');

  tokenize = require('../lib/tokenize');

  Restaurant = mongoose.model('Restaurant');

  rest = new Restaurant({
    name: 'Food Court - RVCE',
    location: 'Mysore Road',
    admin: {
      username: 'akash',
      password: tokenize('akash')
    },
    menu: []
  });

  x('/home/akash/Kode/Viands/Menu.xlsx', function(data) {
    var i, item, len, ref;
    ref = data.message;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item.sno) {
        item.available = true;
        console.log(item);
        rest.menu.push(item);
      }
    }
    console.log(rest);
    return rest.save(function(err) {
      if (!err) {
        console.log('OK');
      }
      return process.exit(0);
    });
  });

}).call(this);
