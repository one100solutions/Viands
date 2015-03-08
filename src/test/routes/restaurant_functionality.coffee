chai = require 'chai'

expect = chai.expect

request = require 'request'

require '../../app'

mongoose = require 'mongoose'

User = mongoose.model 'User'

tokenize = require '../../lib/tokenize'

describe 'Restaurant functionality', ->

	token_restaurant = ''
	username_restaurant = 'akash'

	beforeEach (done)->
		request.post 'http://localhost:3000/login_restaurant',
			form:
				username: username_restaurant
				password: 'akash'
			(status, response, body) ->
				body = JSON.parse body
				token_restaurant = body.Restaurant.admin.token
				done()

	describe 'Addition of credits', ->

		phone = ''

		user = {}
		phone_user = 8277564501
		password_user = tokenize 'akash'

		beforeEach (done) ->
			request.post 'http://localhost:3000/login',
				form:
					phone: phone_user
					password: 'akash'
				(status, response, body) ->
					body = JSON.parse body
					user = body.user
					done()

		it 'should add credits to the user ', (done) ->
			request.post 'http://localhost:3000/add_credits',
				form:
					username: username_restaurant
					token: token_restaurant
					tar_phone: phone_user
					amount: 100
				(status, response, body) ->
					body = JSON.parse body
					console.log body
					expect(body.err).not.to.be.equal(true)

					User.findOne {
						phone: phone_user,
						password: password_user
					}, (err, usr) ->
						console.log 'error',err
						expect(err).not.to.be.equal(true)
						expect(usr.credits).to.be.equal(user.credits + 100)
						done()
