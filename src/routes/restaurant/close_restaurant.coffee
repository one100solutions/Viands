express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Restaurant = mongoose.model 'Restaurant'

router.post '/', (req, res) ->

  if req.body.restaurant_id and req.body.close
    Restaurant.findOne {
      _id: req.body.restaurant_id
    }, (err, restaurant) ->

      if err
        res.json {
          err: true
          message: 'Well Error'
        }

      else if restaurant
        restaurant.close = req.body.close
        console.log(req.body.close)
        restaurant.save (err)->
          if err
            res.json {
              err: true
              message: 'Error occurred'
            }

          else
            res.json {
              err: false
              message: 'Done!'
            }

      else
        res.json {
          err: true
          message: 'No Restaurant'
        }
  else
    res.json {
      err: true
      message: 'Missing Params'
    }

module.exports = router;