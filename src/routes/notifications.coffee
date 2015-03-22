express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Notification = mongoose.model 'Notification'

router.get '/', (req, res) ->

	Notification.find {}, (err, notifications) ->
		if err 
			res.json {
				err: true
				message: 'Error occured'
			}

		else 
			res.json {
				err: false
				message: 'Done'
				notifications: notifications
			}

module.exports = router