express = require 'express'
router = express.Router()

gcm = require '../lib/gcm'

mongoose = require 'mongoose'
Restaurant = mongoose.model 'Restaurant'
User = mongoose.model 'User'

router.post '/', (req, res) ->

	if req.body.token and req.body.menu

		req.body.menu = JSON.parse(req.body.menu)

		Restaurant.findOne {
			'admin.token': req.body.token
		}, (err, rest) ->

			if err 
				console.log 'Error occured in finding restaurant',err
				res.json {
					err: true
					message: 'Error occured'
				}

			else if rest
				rest.menu = req.body.menu
				rest.save (err) ->
					if err
						console.log 'Error occured in saving Restaurant'
						res.json {
							err: true
							message: 'Error'
						}

					else 

						User.find {}, (err, user) ->
							if err 
								console.log 'Error', err

							else
								regIds = [] 
								regIds.push(usr.gcm_id) for usr in user


								gcm(3,'Menu Changed', 'Hey sujith some menu have changed.',regIds)
								
						res.json {
							err: false
							message: 'Menu updated'
						}



			else 
				res.json {
					err: false
					message: 'No such restaurant'
				}

				


	else 
		res.json {
			err: true
			message: 'Missing Parameters'
		}

module.exports = router