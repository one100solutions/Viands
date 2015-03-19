express = require 'express'

router = express.Router()

mongoose = require 'mongoose'

User = mongoose.model 'User'

router.post '/', (req, res) ->

	if req.body.password is 'remove_user'
		User.remove {}, (err) ->
			if err
				res.json {
					err: true
					message: err
				}

			else 
				res.json {
					err: false
					message: 'Data cleared'
				}

	else 
		res.json {
			err: true
			message: 'Incorrect Password'
		}

module.exports = router
	
			
	