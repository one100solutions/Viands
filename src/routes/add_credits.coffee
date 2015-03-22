express = require 'express'

router = express.Router()

mongoose = require 'mongoose'

moment = require 'moment'

gcm = require '../lib/gcm'

Restaurant = mongoose.model 'Restaurant'
Credit = mongoose.model 'Credit'

User = mongoose.model 'User'

findAndCredit = (length, req, res) ->

	if length < 500
		req.body.amount += 0.10 * req.body.amount
	

	User.findOne
		phone: req.body.tar_phone
		(err,user) ->
			if err
				res.json
					err: true
					message: err

			else if user
				user.credits += req.body.amount
				user.save (err) ->
					if err 
						res.json {
							err: true
							message: 'Error occured'
						}

					else
						credit = new Credit {
							amount: req.body.amount
							phone: req.body.tar_phone
							time: new moment().add(5,'hours').add(30,'minutes').format("dddd, MMMM Do YYYY, h:mm:ss a")
						}

						credit.save (err) ->
							if err 
								res.json {
									err: true
									message: 'Somewhere error occured'
								}

							else

								res.json
									err: false
									message: 'Recharge complete'


				#inform the user of updated credits
				gcm(1, 'Recharge ', "Hurray your account is now recharged with #{req.body.amount} ", user.gcm_id);


			else
				res.json
					err: true
					message: 'User not found'

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
					length = 0

					User.find {}, (err, users) ->
						if err 
							res.json {
								err: true
								message: "Error occured"
							}

						length = users.length

						findAndCredit length, req, res

				else
					res.json
						err: true
						message: 'Unknown error'


	else
		res.json
			err: true,
			message: 'Missing/Incorrect params'

module.exports = router
