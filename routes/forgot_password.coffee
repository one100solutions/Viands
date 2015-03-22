###express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
User = mongoose.model 'User'

messenger = require '../lib/springedge'

router.post '/', (req, res) ->

	if req.body.phone

		User.findOne {
			phone: phone
		}, (err, user) ->
			if err 
				res.json {
					err: true
					message: 'Error Occured!'
				}

			else if user 

				messenger(user.phone, 'Your OTP is ' + user.otp)


			else 
				res.json {
					err: true
					message: 'No such user'
				}

	else 
		res.json {
			err: true
			message: 'Missing Parameters'
		}

module.exports = router###