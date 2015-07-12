(function() {
  var chai, expect, host, request, url;

  chai = require('chai');

  expect = chai.expect;

  request = require('request');

  host = require('../../lib/host');

  url = host.url;

  describe('get Api tests', function() {
    return it('should show a list of restaurants', function(done) {
      return request.get(url + 'restaurants', function(status, response, body) {
        body = JSON.parse(body);
        console.log(body);
        expect(body.err).to.be.equal(false);
        expect(body.restaurants[0].admin).to.be.equal(null);
        expect(body.restaurants).to.be.a('array');
        return done();
      });
    });
  });

}).call(this);