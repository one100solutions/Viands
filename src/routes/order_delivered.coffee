express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Restaurant = mongoose.model 'Restaurant'
User = mongoose.model 'User'
Order = mongoose.model 'Order'

messenger = require '../lib/springedge'

gcm = require '../lib/gcm'


notifyUser = (user_id, order) ->

	User.findOne {
		id: user_id
	}, (err, user) ->

		if err 
			res.json {
				err: true
				message: 'Error'
			}

		else if user

			gcm(2, 'Order confirmation!!', "Your order id #{order.id} is delivered", user.gcm_id)

findOrderAndComplete = (rest_id, res, order_id) ->

	console.log 'Restaurant id is ord', rest_id

	Order.findOne {
		restaurant_id: rest_id
		id: order_id
	}, (err, order) ->

		if err 
			res.json {
				err: true
				message: 'Error Occured'
			}

		else if order

			order.delivered = true

			order.save (err) ->
				if err
					res.json {
						err: true
						message: 'Error!!'
					}

				else
					notifyUser order.user_id,order

					res.json {
						err: false
						message: "Order delivered"
					}

		else 
			res.json {
				err: true
				message: 'NO such order'
			}

					



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