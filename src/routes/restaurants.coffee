express = require 'express'
router = express.Router()

mongoose = require 'mongoose'

Restaurants = mongoose.model 'Restaurant'

router.get '/', (req, res) ->

  Restaurants.find {}, (error, restaurants) ->
    if error
      res.json
        err: true,
        message: error

    else if restaurants

      for restaurant in restaurants
        restaurant.admin = null

      res.json
        err: false,
        message: 'Search complete',
        restaurants: restaurants

    else
      res.json
        err: true,
        message: 'No restaurants found'

module.exports = router
