chai = require 'chai'

expect = chai.expect

request = require 'request'

require '../../app'

mongoose = require 'mongoose'

User = mongoose.model 'User'

Orders = mongoose.model 'Order'

tokenize = require '../../lib/tokenize'

describe 'Restaurant functionality', ->

  token_restaurant = ''
  username_restaurant = 'akash'

  beforeEach (done)->
    request.post 'http://localhost:3000/login_restaurant',
      form:
        username: username_restaurant
        password: 'akash'
      (status, response, body) ->
        body = JSON.parse body
        token_restaurant = body.Restaurant.admin.token
        done()

  describe 'Addition of credits', ->

    phone = ''

    user = {}
    phone_user = 8277564501
    password_user = tokenize 'akash'

    beforeEach (done) ->
      request.post 'http://localhost:3000/login',
        form:
          phone: phone_user
          password: 'akash'
        (status, response, body) ->
          body = JSON.parse body
          user = body.user
          done()

    it 'should add credits to the user ', (done) ->
      request.post 'http://localhost:3000/add_credits',
        form:
          username: username_restaurant
          token: token_restaurant
          tar_phone: phone_user
          amount: 100
        (status, response, body) ->
          body = JSON.parse body
          console.log body
          expect(body.err).not.to.be.equal(true)

          User.findOne {
            phone: phone_user,
            password: password_user
          }, (err, usr) ->
            console.log 'error',err
            expect(err).not.to.be.equal(true)
            expect(usr.credits).to.be.equal(user.credits + 100)
            done()

  describe 'Should list all the orders', ->

    it 'should display the orders', (done) ->

      count = 0

      orders_db = []
      orders_api = []

      go = (done) ->
        if count is 2
          expect(orders.db_length).to.not.be.equal(0)
          expect(orders_db.length).to.be.equal(orders_api.length)
          done()


      request.post 'http://localhost:3000/get_order',
        form: {
          token: token_restaurant
        }, (status, response, body) ->
          body = JSON.parse body
          console.log body
          expect(body.err).to.not.be.equal(true)
          if body.orders then orders_api = body.orders
          count++
          go(done)

      Order.find {}, (err, orders) ->
        console.log 'Orders from db are',orders
        expect(err).not.to.be.equal(true)
        orders_db = orders
        count++
        go(done)


