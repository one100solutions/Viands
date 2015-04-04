express = require 'express'
router = express.Router()

mongoose = require 'mongoose'

AccountDetails = require '../../modules/getUserAccountDetails'

User = mongoose.model 'User'
Order = mongoose.model 'Order'

router.post '/', (req, res) ->

	if req.body.token
    AccountDetails.getOrders req.body.token, (response) ->
      console.log('Response is ',response)
      res.json(response);


	else
		res.json {
			err: true
			message: 'Missing Parameters'
		}

module.exports = router