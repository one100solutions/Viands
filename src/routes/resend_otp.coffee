express = require 'express'
router = express.Router()

mongoose = require 'mongoose'

User = mongoose.model 'User'

messenger = require '../lib/messenger_msg91'

tokenize = require '../lib/tokenize'

router.post '/', (req, res) ->

	if req.body.phone and req.body.password

		User.findOne {
			phone: req.body.phone
			password: tokenize(req.body.password)
		}, (err, user) ->
			console.log 'Hmm',err,user
			if err
				res.json {
					err: true
					message: err
				}

			else if user

				messenger user.phone, 'your otp is: ' + user.otp, (err, msg) ->
					if err then console.log err

				res.json {
					err: false
					message: 'Message Queued'
				}

			else if !user
				res.json {
					err: true
					message: 'No such user!'
				}
			
				
			

	else
		res.json {
			err: true
			message: 'Invalid parameters'
		}

module.exports = router
