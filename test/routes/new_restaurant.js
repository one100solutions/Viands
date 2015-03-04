(function() {
  var Restaurant, chai, expect, mongoose, request;

  chai = require('chai');

  expect = chai.expect;

  request = require('request');

  mongoose = require('mongoose');

  require('../../app');

  require('../../models/RestaurantSchema');

  Restaurant = mongoose.model('Restaurant');

  describe('New Restaurant route', function() {
    var createRestaurant, login;
    login = false;
    it('should create a new Restaurant', function(done) {
      return createRestaurant(done, 1);
    });
    it('should not create a new entry', function(done) {
      return createRestaurant(done, 2);
    });
    it('login to a Restaurant', function(done) {
      return request.post('http://localhost:3000/login_restaurant', {
        form: {
          username: 'new_user',
          password: 'akash'
        }
      }, function(err, response, body) {
        if (err) {
          return done(err);
        } else if (body) {
          body = JSON.parse(body);
          console.log(body.message);
          login = true;
          expect(body.err).to.equal(false);
          return done();
        } else {
          expect(body.err).to.not.equal(true);
          login = true;
          return done();
        }
      });
    });
    afterEach(function(done) {
      console.log('Executed', login);
      if (login) {
        Restaurant.findOneAndRemove({
          name: 'Hotel A'
        }, function(err) {
          return console.log(err);
        });
      }
      return done();
    });
    return createRestaurant = function(done, flag) {
      return request.post('http://localhost:3000/new_restaurant', {
        form: {
          username: 'new_user',
          password: 'akash',
          rest_name: 'Hotel A',
          phone: 8277564501
        }
      }, function(err, response, body) {
        if (err) {
          return done(err);
        } else if (body && flag === 1) {
          body = JSON.parse(body);
          console.log(body.message);
          expect(body.err).to.equal(false);
          return done();
        } else if (body && flag === 2) {
          body = JSON.parse(body);
          expect(body.err).to.not.equal(false);
          return done();
        } else {
          expect(body.err).to.not.equal(true);
          return done();
        }
      });
    };
  });

}).call(this);
