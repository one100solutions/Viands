chai= require 'chai'
expect = chai.expect

host = require '../../lib/host'
url = host.url

request = require 'request'

mongoose = require 'mongoose'
User = mongoose.model 'User'

describe 'Users actions', ->

  user_token = ''

  restaurant = ''

  order_item_id = ''

  beforeEach (done) ->
    complete = 0

    go = (done) ->
      if complete is 2 then done()

    request.post url + 'login',
      form:
        phone: 8277564501
        password: 'akash'
      (status, response, body) ->
        body = JSON.parse body
        user_token = body.user.token
        console.log 'user_token: ',user_token
        complete++
        go(done)

    request.get url + 'restaurants',
      (status, response, body) ->
        body = JSON.parse body
        console.log 'Restaurant id is',body.restaurants[0]._id
        restaurant = body.restaurants[0]._id
        order_item_id = body.restaurants[0].menu[0]._id
        complete++
        go(done)

  it 'should order food', (done) ->

    data = {
      token: user_token
      rest_id: restaurant
      order:
        type: 'now'
        time_deliver: null
        items: [ {id: order_item_id , quantity: 2} ]
    }

    data = JSON.stringify data

    type = JSON.parse(data).order.type

    console.log 'Type',type

    request.post url + 'order',
      form:
        data: data
      (status, response, body) ->
        console.log 'JSOn',body
        body = JSON.parse body
        console.log 'Body order',body
        expect(body.err).to.be.equal(false)
        expect(body.order_id).to.not.be.undefined
        done()

  it 'should register gcm', (done) ->

    request.post url + 'register_gcm',
      form:
        token: user_token
        gcm_id: 'Akndkuewhufihwejkbf'
        mode: 1
      (status, response, body)->
        console.log 'Body',body
        body = JSON.parse body
        expect(body.err).to.be.equal(false)

        User.findOne {
          token: user_token
        }, (err, user) ->
          expect(user.gcm_id).to.be.equal('Akndkuewhufihwejkbf')
          done()


