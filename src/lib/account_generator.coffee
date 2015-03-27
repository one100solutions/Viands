
mongoose = require 'mongoose'

console.log 'A'

require '../app'

require '../models/OrderSchema'
require '../models/CreditSchema'

Orders = mongoose.model 'Order'
Credits = mongoose.model 'Credit'

message = require './template_account'

mailer = require './mailer'

async = require 'async'

ordered = []
credited = []

#Loyel Akash Sanchay Rahul Sid Sujith
omitPhone = [8970707712, 8277564501, 9986787295, 7411487928, 9482532445, 7259281007]

ordersString = '<br /> Order History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />'

creditsString = '<br /> Credit History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />'

order = (callback)->
	Orders.find {}, (err, orders) ->
		if err 
			throw new Error("Error occured", err)

		for order in orders
			if omitPhone.indexOf(order.phone) < 0
				credited.push {
					phone: order.phone
					total: order.total_amount
					time: order.time
				}

				ordersString += "#{order.phone} &nbsp;&nbsp;&nbsp;&nbsp; #{order.total_amount} &nbsp;&nbsp;&nbsp;&nbsp; #{order.time}<br />"

		callback null,ordered

credit = (callback)->
	Credits.find {}, (err, credits) ->
		if err 
				throw new Error("Error occured", err)

		for credit in credits

			if omitPhone.indexOf(credit.phone) < 0
				ordered.push {
					phone: credit.phone
					amount: credit.amount
					time: credit.time
				}

				creditsString += "#{credit.phone} &nbsp;&nbsp;&nbsp;&nbsp; #{credit.amount} &nbsp;&nbsp;&nbsp;&nbsp; #{credit.time} <br />"

		callback null,credited



async.parallel [order, credit], (err, results) ->
	#console.log 'results', results

	final = message(ordersString,creditsString)

	mailer 'sidsb94@gmail.com', final, (err, response) ->
		console.log 'response', response

		process.exit(0)



