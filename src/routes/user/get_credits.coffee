express = require 'express'
router = express.Router()

mongoose = require 'mongoose'

User = mongoose.model 'User'

router.post '/', (req, res) ->

	if req.body.token 

		User.findOne {
			token: req.body.token
		}, (err, user) ->

			if err
				res.json {
					err: true
					message: 'Error Occured'
				}

			else if user 
				res.json {
					err: false
					message: 'Done!'
					credits: user.credits
				}

			else 
				res.json {
					err: true
					message: 'No such user'
				}


	else 
		res.json {
			err: true
			message: 'Missing Params'
		}

module.exports = router