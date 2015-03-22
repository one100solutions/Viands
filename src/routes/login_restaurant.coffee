express = require 'express'

router = express.Router()

tokenize = require '../lib/tokenize'

mongoose = require 'mongoose'

Restaurant = mongoose.model 'Restaurant'

router.post '/', (req,res) ->
  if req.body.username and req.body.password

    Restaurant.findOne
      'admin.username': req.body.username
      'admin.password': tokenize req.body.password
      (err,rest) ->
        if err
          res.json
            err: true
            message: err

        else if rest
          rest.admin.token = tokenize rest.admin.username + rest.name + rest.phone

          rest.save (err) ->
            if err
              res.json
                err: true
                message: err

            else
              rest.name = rest.location = null
              rest.admin.password = null
              rest.menu = null

              res.json
                err: false
                message: 'Logged In'
                Restaurant: rest

        else
          res.json
            err: true
            message: 'Restaurant not found'
  else
    res.json
      err: true,
      message: 'missing params'

module.exports = router
