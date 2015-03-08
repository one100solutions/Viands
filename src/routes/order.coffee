express = require 'express'
router = express.Router()

mongoose = require 'mongoose'

EventEmitter = require('events').EventEmitter
moment = require 'moment'
_ = require 'underscore'

viands = new EventEmitter()

Order = mongoose.model 'Order'
User = mongoose.model 'User'
Restaurant = mongoose.model 'Restaurant'

router.post '/', (req, res) ->

  restaurant = {}
  restaurant_found = false
  user_found = false
  done = 0

  req.body = JSON.parse(req.body.data)

  console.log req.body

  if req.body.token

    Restaurant.findOne
      _id: req.body.rest_id
      (error, rest) ->
        if error
          res.json
            err: true
            message: error

        else if restaurant
          restaurant = rest
          console.log 'Restaurant has menu',restaurant.menu[0]
          restaurant_found = true

        else
          console.log 'Restaurant not found'
          restaurant_found = false

        done++
        viands.emit 'found'

      console.log 'Token order',req.body.token

      User.findOne
        token: req.body.token
        (error, user) ->
          if error
            res.json
              err: true
              message: error

          else if user
            user_found = true

          else 
            console.log 'user not found'

          done++
          viands.emit 'found'

      items_available = []
      items_ordered = []

      validateAndOrder = (restaurant, req) ->
        console.log restaurant.menu[0]
        for item in restaurant.menu
          if item.available then items_available.push item._id.toString()

        console.log 'request body',req.body.order.items

        for item in req.body.order.items
          item.complete = false
          items_ordered.push item.id

        console.log 'Orderd',typeof items_ordered[0]
        console.log 'Available',typeof items_available[0]

        console.log 'Difference is',_.difference(items_ordered, items_available)

        if _.difference(items_ordered, items_available).length is 0 and items_ordered
          console.log 'Ordering'

          newOrder = new Order
            time: new moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
            type: req.body.order.type
            time_deliver: req.body.order.time_deliver
            items: req.body.order.items

          newOrder.save (error,order) ->
            
            console.log order

            if error
              res.json
                err: error
                message: err

            else
              res.json
                err: false
                message: 'Order placed'
                order_id: order._id
                order_type: order.type

        else
          res.json
            err: true
            message: 'Items not available'

      viands.on 'found', ->
        console.log 'Done os ',done
        if done is 2
          if restaurant_found and user_found
            console.log req.body
            validateAndOrder(restaurant, req)

          else
            console.log 'Values are', restaurant_found, user_found
            res.json
              err: true,
              message: 'No such user/ restaurant'

  else
    res.json
      err: true
      message: 'User not logged in'

module.exports = router
