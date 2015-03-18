(function() {
  var chai, expect, host, request, url;

  chai = require('chai');

  expect = chai.expect;

  host = require('../../lib/host');

  url = host.url;

  request = require('request');

  describe('Users actions', function() {
    var order_item_id, restaurant, user_token;
    user_token = '';
    restaurant = '';
    order_item_id = '';
    beforeEach(function(done) {
      var complete, go;
      complete = 0;
      go = function(done) {
        if (complete === 2) {
          return done();
        }
      };
      request.post(url + 'login', {
        form: {
          phone: 8277564501,
          password: 'akash'
        }
      }, function(status, response, body) {
        body = JSON.parse(body);
        user_token = body.user.token;
        console.log('user_token: ', user_token);
        complete++;
        return go(done);
      });
      return request.get(url + 'restaurants', function(status, response, body) {
        body = JSON.parse(body);
        console.log('Restaurant id is', body.restaurants[0]._id);
        restaurant = body.restaurants[0]._id;
        order_item_id = body.restaurants[0].menu[0]._id;
        complete++;
        return go(done);
      });
    });
    return it('should order food', function(done) {
      var data, type;
      data = {
        token: user_token,
        rest_id: restaurant,
        order: {
          type: 'now',
          time_deliver: null,
          items: [
            {
              id: order_item_id,
              quantity: 2
            }
          ]
        }
      };
      data = JSON.stringify(data);
      type = JSON.parse(data).order.type;
      console.log('Type', type);
      return request.post(url + 'order', {
        form: {
          data: data
        }
      }, function(status, response, body) {
        console.log('JSOn', body);
        body = JSON.parse(body);
        console.log('Body order', body);
        expect(body.err).to.be.equal(false);
        expect(body.order_id).to.not.be.undefined;
        return done();
      });
    });
  });


  /*
    it 'should send a otp', (done) ->
  
      request.post url + 'resend_otp',
        form:
          phone: 8277564501
          password: 'akash'
      (status, response, body)->
   */

}).call(this);
