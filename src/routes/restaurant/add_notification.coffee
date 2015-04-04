express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Notification = mongoose.model 'Notification'
Restaurant = mongoose.model 'Restaurant'
User = mongoose.model 'User'

gcm = require '../../lib/gcm'

notifyAll = (title, message) ->
	User.find {}, (err, users) ->
		if err 
			console.log 'Error occured'


		else
			regIds = []

			regIds.push(usr.gcm_id) for usr in users

			gcm 4, title, message, regIds


router.post '/', (req, res) ->

	if req.body.token and req.body.title and req.body.message

		Restaurant.findOne {
			'admin.token': req.body.token
		}, (err, rest) ->

			if err 
				res.json {
					err: true
					message: 'Error occured'
				}

			else if rest 
				notification = new Notification {
					title: req.body.title
					message: req.body.message
				}

				notification.save (err)->
					if err 
						res.json {
							err: true
							message: 'Error occured!'
						}

					else 
						res.json {
							err: false
							message: 'Notification sent'
						}

						notifyAll(req.body.title, req.body.message)


			else 
				res.json {
					err: true
					message: 'No such Restaurant'
				}

	else 
		res.json {
			err: true
			message: 'Missing params'
		}

module.exports = router