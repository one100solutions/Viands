(function() {
  var chai, expect, request;

  chai = require('chai');

  expect = chai.expect;

  request = require('request');

  describe('Restaurant functionality', function() {
    var token;
    token = '';
    beforeEach(function(done) {
      return request.post('http://localhost:3000/login_restaurant', {
        form: {
          username: 'akash',
          password: 'akash'
        }
      }, function(status, response, body) {
        return token = body.token;
      });
    });
    return describe('Addition of credits', function() {
      var phone;
      phone = '';
      return beforeEach(function(done) {
        return request.post('http://localhost:3000/signup');
      });
    });
  });

}).call(this);
