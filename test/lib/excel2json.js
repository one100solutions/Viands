(function() {
  var Rstaurant, chai, expect, mongoose, x;

  chai = require('chai');

  expect = chai.expect;

  x = require('../../lib/excel2json');

  mongoose = require('mongoose');

  require('../../app');

  require('../../models/RestaurantSchema');

  Rstaurant = mongoose.model('Restaurant');

  describe('It should convert excel file to json', function(done) {
    return x('/home/akash/Programs/Viands/Menu.xlsx', function(err, message) {
      return expect(err).to.be(false);
    });
  });

}).call(this);
