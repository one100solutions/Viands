chai = require 'chai'

expect = chai.expect

x = require '../../lib/excel2json'

mongoose = require 'mongoose'

require '../../app'

require '../../models/RestaurantSchema'

Rstaurant = mongoose.model 'Restaurant'

describe 'It should convert excel file to json', (done) ->
	x '/home/akash/Projects/Viands/Menu.xlsx', (err, message) ->
		expect(err).to.be(false)
