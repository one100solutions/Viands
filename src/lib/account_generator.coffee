
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

ordersString = '\n Order History-\n Phone \t Amount \n'

creditsString = '\n Credit History-\n Phone \t Amount \n'

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

				ordersString += "#{order.phone} \t #{order.amount} \t #{order.time}\n"

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

				creditsString += "#{credit.phone} \t #{credit.amount} \t #{credit.time} \n"

		callback null,credited



async.parallel [order, credit], (err, results) ->
	#console.log 'results', results

	final = message(ordersString,creditsString)

	mailer 'sidsb94@gmail.com', final, (err, response) ->
		console.log 'response', response

		process.exit(0)



