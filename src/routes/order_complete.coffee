express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Restaurant = mongoose.model 'Restaurant'
User = mongoose.model 'User'
Order = mongoose.model 'Order'


notifyUser = (user_id, order) ->

	#To be Implemented

findOrderAndComplete = (rest_id, res, order_id) ->

	console.log 'Restaurant id is ord', rest_id

	Order.findOne {
		restaurant_id: rest_id
		_id: order_id
	}, (err, order) ->

		if err 
			res.json {
				err: true
				message: 'Error Occured'
			}

		else if order

			order.complete = true

			order.save (err) ->
				if err
					res.json {
						err: true
						message: 'Error!!'
					}

				else

					res.json {
						err: false
						message: "Order updated"
					}

		else 
			res.json {
				err: true
				message: 'NO such order'
			}

					#notifyUser user_id,order



router.post '/', (req, res) ->

	console.log 'Request Body for order complete', req.body

	if req.body.token and req.body.order_id

		Restaurant.findOne {
			'admin.token': req.body.token
		}, (err, rest) ->

			if err 
				res.json {
					err: true
					message: 'Error Occured'
				}

			else if rest
				rest_id = rest._id

				findOrderAndComplete(rest_id, res, req.body.order_id)

			else 
				res.json {
					err: true
					message: 'No such restaurant'
				}

	else
		res.json {
			err: true
			message: 'Missing params'
		}

module.exports = router