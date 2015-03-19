express = require 'express'
router = express.Router()

mongoose = require 'mongoose'

tokenize = require '../lib/tokenize'

User = mongoose.model 'User'

router.post '/', (req,res) ->

	if req.body.phone and req.body.password

		req.body.password = tokenize req.body.password
		
		User.findOne
			phone: req.body.phone,
			password: req.body.password,
			
		, (err,user) ->

			if err 
				console.log err
				res.json
					err: true,
					message: err

			else if(!user)
				res.json
					err: true
					message: 'User not found!!'

			else if (user)

				if user.validation is false
					res.json {
						err: true,
						message: 'User not verified'
					}

					return


				user.token = tokenize(user.phone + user.email + user.password)

				user.save (err) ->
					if err 
						res.json {
							err: true,
							message: err
						}

					else
						user.password = null

						res.json
							err: false,
							message: 'User found',
							user: user


	else 
		res.json
			err: true,
			message: 'Missing Paramters'

module.exports = router;