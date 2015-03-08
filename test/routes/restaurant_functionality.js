(function() {
  var User, chai, expect, mongoose, request, tokenize;

  chai = require('chai');

  expect = chai.expect;

  request = require('request');

  require('../../app');

  mongoose = require('mongoose');

  User = mongoose.model('User');

  tokenize = require('../../lib/tokenize');

  describe('Restaurant functionality', function() {
    var token_restaurant, username_restaurant;
    token_restaurant = '';
    username_restaurant = 'akash';
    beforeEach(function(done) {
      return request.post('http://localhost:3000/login_restaurant', {
        form: {
          username: username_restaurant,
          password: 'akash'
        }
      }, function(status, response, body) {
        body = JSON.parse(body);
        token_restaurant = body.Restaurant.admin.token;
        return done();
      });
    });
    return describe('Addition of credits', function() {
      var password_user, phone, phone_user, user;
      phone = '';
      user = {};
      phone_user = 8277564501;
      password_user = tokenize('akash');
      beforeEach(function(done) {
        return request.post('http://localhost:3000/login', {
          form: {
            phone: phone_user,
            password: 'akash'
          }
        }, function(status, response, body) {
          body = JSON.parse(body);
          user = body.user;
          return done();
        });
      });
      return it('should add credits to the user ', function(done) {
        return request.post('http://localhost:3000/add_credits', {
          form: {
            username: username_restaurant,
            token: token_restaurant,
            tar_phone: phone_user,
            amount: 100
          }
        }, function(status, response, body) {
          body = JSON.parse(body);
          console.log(body);
          expect(body.err).not.to.be.equal(true);
          return User.findOne({
            phone: phone_user,
            password: password_user
          }, function(err, usr) {
            console.log('error', err);
            expect(err).not.to.be.equal(true);
            expect(usr.credits).to.be.equal(user.credits + 100);
            return done();
          });
        });
      });
    });
  });

}).call(this);
