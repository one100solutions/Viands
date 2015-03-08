express = require 'express'

router = express.Router()

mongoose = require 'mongoose'

Restaurant = mongoose.model 'Restaurant'

User = mongoose.model 'User'

router.post '/', (req, res) ->
	console.log req.body
	if req.body.username and req.body.token and req.body.tar_phone and req.body.amount

		req.body.amount = Number(req.body.amount)

		Restaurant.findOne
			'admin.username': req.body.username
			'admin.token': req.body.token
			(err, rest) ->
				if err
					res.json
						err: true,
						message: err

				else if !rest
					res.json
						err: true
						message: 'Incorrect Credentials'

				else if rest
					User.findOne
						phone: req.body.tar_phone
						(err,user) ->
							if err
								res.json
									err: true
									message: err

							else if user
								user.credits += req.body.amount
								user.save()

								#inform the user of updated credits

								res.json
									err: false
									message: 'Recharge complete'

							else
								res.json
									err: true
									message: 'User not found'

				else
					res.json
						err: true
						message: 'Unknown error'


	else
		res.json
			err: true,
			message: 'Missing/Incorrect params'

module.exports = router
