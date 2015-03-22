express = require 'express'
router = express.Router()



mongoose = require 'mongoose'

User = mongoose.model 'User'
Order = mongoose.model 'Order'



router.post '/', (req, res) ->

	orderInfo = []

	if req.body.token

		User.findOne {
			token: req.body.token
		}, (err, user) ->
			if err
				res.json {
					err: true
					message: err
				}

			else if user
				
				Order.find {
					user_id: user.id
				}, (err, orders) ->
					if err 
						res.json {
							err: true
							message: err
						}

					else 
						res.json {
							err: false
							message: 'Orders retrieved'
							orders: orders
						}

			else if !user

				res.json {
					err: true
					message: 'User not found'
				}


	else 
		res.json {
			err: true
			message: 'Missing Parameters'
		}

module.exports = router