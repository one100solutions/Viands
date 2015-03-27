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
        token_restaurant = body.Restaurant.token
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
          console.log 'User credits ', user
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
          expect(body.err).not.to.be.equal(true)

          User.findOne {
            phone: phone_user,
            password: password_user
          }, (err, usr) ->
            console.log 'error',err
            expect(err).not.to.be.equal(true)
            expect(usr.credits).to.be.equal(user.credits + 110)
            done()



  describe 'Should list all the orders', ->

    order = {}

    it 'should display the orders', (done) ->

      count = 0

      orders_db = []
      orders_api = []

      go = (done) ->
        if count is 2
          expect(orders_db.length).to.be.equal(orders_api.length)
          done()


      request.post 'http://localhost:3000/get_order',
        form: {
          token: token_restaurant
        }, (status, response, body) ->
          body = JSON.parse body
          console.log 'Body after get_order api',body
          expect(body.err).to.not.be.equal(true)
          if body.orders then orders_api = body.orders

          if orders_api.length > 0 then order = orders_api[0]

          count++
          go(done)

      Orders.find {
        complete: false
      }, (err, orders) ->
        #console.log 'Orders from db are',orders
        expect(err).not.to.be.equal(true)
        orders_db = orders
        count++
        go(done)

    it 'should mark an order as complete', (done) ->
      console.log 'Mak #',order

      request.post 'http://localhost:3000/order_complete',
        form: {
          token: token_restaurant
          order_id: order.id
        }, (status, response, body) ->
          console.log 'Marking complete bod',body
          body = JSON.parse(body)
         

          expect(body.err).to.be.equal(false)

          Orders.findOne {
            id: order.id
          }, (err, ord) ->
            console.log 'Order reply',ord
            expect(err).to.be.equal(null)

            if ord.complete
              expect(ord.complete).to.be.equal(true)

            ord.complete = false

            ord.save()

            done()

    it 'should add a notification and notify everyone', (done)->

      request.post 'http://localhost:3000/add_notification',
        form: {
          token: token_restaurant
          title: 'Test'
          message: 'Street play is too much' + Date.now()
        }, (status, response, body) ->
          body = JSON.parse(body)
          console.log 'Notification1',body

          expect(body.err).to.be.equal(false)

          request.get 'http://localhost:3000/notifications', (status, response, body) ->
            body = JSON.parse body
            #console.log 'Notieuwifui2',body
            expect(body.err).to.be.equal(false)

            notification_get = body.notifications[body.notifications.length - 1]
            #console.log 'fuherui3',notification_get
            expect(notification_get.title).to.be.equal('Test')
            done()