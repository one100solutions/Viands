x = require './excel2json'

mongoose = require 'mongoose'

require '../app'

require '../models/RestaurantSchema'

Restaurant = mongoose.model 'Restaurant'

rest = new Restaurant
	name: 'Food Court - RVCE',
	location: 'Mysore Road',
	admin: {
		username: 'akash',
		password: 'akash'
	}

x '/home/akash/Programs/Viands/Menu.xlsx', (data) ->
	for item in data.message
		rest.menu.push item

	console.log rest

	rest.save (err) ->
		console.log 'OK' unless err

