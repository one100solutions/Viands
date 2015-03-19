express = require 'express'

router = express.Router()

mongoose = require 'mongoose'

Restaurant = mongoose.model 'Restaurant'

tokenize = require '../lib/tokenize'

router.post '/', (req,res) ->

	console.log 'In route handler'

	if req.body.username and req.body.password and req.body.rest_name and  req.body.phone
		Restaurant.findOne {
			name: req.body.rest_name,
			phone: req.body.phone
		}, (err, rest) ->

			if err
				
				res.json {
					err: true,
					message: err
				}

			else if rest
				
				res.json {
					err: true,
					message: 'Restaurant exists!!'
				}

			else if !rest
        
				new_rest = new Restaurant(
					  name: req.body.rest_name
					  phone: req.body.phone
					  admin: 
					  	username: req.body.username
					  	password: tokenize(req.body.password)
					)

				new_rest.save (err) ->
					if err
						res.json {
							err: true,
							message: err
						}

					else 
						res.json {
							err: false,
							message: 'Restaurant Added'
						}

	else 
		res.json
			err: true,
			message: 'Missing paramteres'

module.exports = router