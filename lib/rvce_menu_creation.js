(function() {
  var Restaurant, mongoose, rest, x;

  x = require('./excel2json');

  mongoose = require('mongoose');

  require('../app');

  require('../models/RestaurantSchema');

  Restaurant = mongoose.model('Restaurant');

  rest = new Restaurant({
    name: 'Food Court - RVCE',
    location: 'Mysore Road',
    admin: {
      username: 'akash',
      password: 'akash'
    }
  });

  x('/home/akash/Programs/Viands/Menu.xlsx', function(data) {
    var i, item, len, ref;
    ref = data.message;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      rest.menu.push(item);
    }
    console.log(rest);
    return rest.save(function(err) {
      if (!err) {
        return console.log('OK');
      }
    });
  });

}).call(this);
