chai = require 'chai'

expect = chai.expect

request = require 'request'

describe 'Restaurant functionality', ->

	token = ''

	beforeEach (done)->
		request.post 'http://localhost:3000/login_restaurant',
			form:
				username: 'akash'
				password: 'akash'
			(status, response, body) ->
				token = body.token

	describe 'Addition of credits', ->

		phone = ''

		beforeEach (done) ->
			request.post 'http://localhost:3000/signup',
				#make a default user and add their