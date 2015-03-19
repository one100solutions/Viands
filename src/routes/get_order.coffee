express = require 'express'
router= express.Router()

mongoose = require 'mongoose'
Order = mongoose.model 'Order'
Restaurant = mongoose.model 'Restaurant'

router.post '/', (req, res) ->

  if req.body.token

    Restaurant.findOne {
      'admin.token': req.body.token
    }, (err, restaurant) ->
      if err
        res.json {
          err: true
          message: err
        }

      else if restaurant

        Order.find {
          restaurant_id: restaurant._id
        }, (err, orders) ->
          if err
            res.json {
              err: true
              message: err
            }

          else if orders

            res.json {
              err: false
              message: 'Orders found'
              orders: orders
            }

          else 

            res.json {
              err: true
              message: 'No Orders'
            }

      else 

        res.json {
          err: true
          message: 'Restaurant not found'
        }

  else

    res.json {
      err: true
      message: 'Missing Parameters'
    }

module.exports = router



