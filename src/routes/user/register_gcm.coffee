express = require 'express'

router = express.Router()

mongoose = require 'mongoose'

User = mongoose.model 'User'
Restaurant = mongoose.model 'Restaurant'

gcm = require '../../lib/gcm'

#Request: token,gcm_id, 
##	mode=0 for restaurant and 1 for user

#Response: done

router.post '/', (req, res) ->

	console.log "Request body", req.body	

	if req.body.token and req.body.gcm_id and req.body.mode is '1'

		User.findOne {
			token: req.body.token
		}, (err, user) ->

			if err 
				res.json {
					err: true
					message: 'Error occured!'
				}

			else if user
				user.gcm_id = req.body.gcm_id

				user.save (err) ->
					if err 
						res.json {
							err: true
							message: 'Error occured!!'
						}

					else 
						res.json {
							err: false
							message: 'Device Registered'
						}

			else 
				res.json {
					err: true
					message: 'No such user found'
				}

	else if req.body.token and req.body.gcm_id and req.body.mode is '0'

		Restaurant.findOne {
			'admin.token': req.body.token
		}, (err, restaurant) ->

			if err 
				res.json {
					err: true
					message: 'Error ocurred'
				}

			else if restaurant 
				restaurant.gcm_id = req.body.gcm_id

				restaurant.save (err) ->

					if err 
						res.json {
							err: true
							message: 'Error occured!'
						}

					else 

						res.json {
							err: false
							message: 'Deivce Registered'
						}

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