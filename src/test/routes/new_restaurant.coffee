chai = require 'chai'

expect = chai.expect

request = require 'request'

mongoose = require 'mongoose'

require '../../app'

require '../../models/RestaurantSchema'

Restaurant = mongoose.model 'Restaurant'

describe 'New Restaurant route', ->

	login = false

	it 'should create a new Restaurant', (done) ->
		createRestaurant done,1

	it 'should not create a new entry', (done) ->
		createRestaurant done,2

	it 'login to a Restaurant', (done) ->
		request.post 'http://localhost:3000/login_restaurant',
		form:
			username: 'new_user'
			password: 'akash'
		,(err, response, body) ->
			if err
		  		done(err)

		  	else if body
		  		body = JSON.parse body
		  		console.log body.message
		  		login = true
		  		expect(body.err).to.equal(false)
		  		done()

		  	else
		  		expect(body.err).to.not.equal(true)
		  		login = true
		  		done()

	afterEach (done)->
		console.log 'Executed',login
		if login
			Restaurant.findOneAndRemove
				name: 'Hotel A'
				(err) ->
					console.log err
		done()

	createRestaurant = (done, flag) ->
			request.post 'http://localhost:3000/new_restaurant',
		  form:
		  	username: 'new_user'
		  	password: 'akash'
		  	rest_name: 'Hotel A'
		  	phone: 8277564501
		  (err, response, body) ->
		  	if err
		  		done(err)

		  	else if body and flag is 1
		  		body = JSON.parse body
		  		console.log body.message
		  		expect(body.err).to.equal(false)
		  		done()

		  	else if body and flag is 2
		  		body = JSON.parse body
		  		expect(body.err).to.not.equal false
		  		done()


		  	else
		  		expect(body.err).to.not.equal(true)
		  		done()
