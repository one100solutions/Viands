
mongoose = require 'mongoose'

moment = require 'moment'
console.log 'A'

require '../app'

require '../models/OrderSchema'
require '../models/CreditSchema'

Orders = mongoose.model 'Order'
Credits = mongoose.model 'Credit'

message = require './template_account'

mailer = require './mailer'

async = require 'async'

_ = require 'underscore'

credited = []
ordered = []

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

        curDate = moment()

        dbDate = moment(order.time, "dddd, MMMM Do YYYY, h:mm:ss a")

        if curDate.diff(dbDate,'days') is 0

          ordered.push {
            phone: order.phone
            total: order.total_amount
            time: order.time
          }

  callback(null, ordered)

        #ordersString += "#{order.phone} &nbsp;&nbsp;&nbsp;&nbsp; #{order.total_amount} &nbsp;&nbsp;&nbsp;&nbsp; #{order.time}<br />"

credit = (callback)->
	Credits.find {}, (err, credits) ->
		if err 
				throw new Error("Error occurred", err)

		for credit in credits


      curDate = moment()

      dbDate = moment(credit.time, "dddd, MMMM Do YYYY, h:mm:ss a")

      if curDate.diff(dbDate,'days') is 0

        if omitPhone.indexOf(credit.phone) < 0
          credited.push {
            phone: credit.phone
            amount: credit.amount
            time: credit.time
          }

        creditsString += "#{credit.phone} &nbsp;&nbsp;&nbsp;&nbsp; #{credit.amount} &nbsp;&nbsp;&nbsp;&nbsp; #{credit.time} <br />"

		callback null,credited



async.parallel [order, credit], (err, results) ->

  #console.log 'results', results

  ordered = _.sortBy(ordered,'phone')

  credited = _.sortBy(credited, 'phone')

  i = 0

  uniquePhoneOrdered = _.uniq(_.pluck(ordered,'phone'), true)

  uniquePhoneCredited = _.uniq(_.pluck(credited,'phone'), true)

  uniquePhone = _.union(uniquePhoneCredited, uniquePhoneOrdered)

  finalAccounts = []

  for _phone in uniquePhone

    uniqueObjectOrder = _.where(ordered,{
      'phone': _phone
    })

    uniqueObjectCredit = _.where(credited,{
      'phone': _phone
    })

    newObj = {
      phone: _phone
    }

    reduceHelper = (memo, num) ->
      memo + num

    _totalOrdered = _.reduce(_.pluck(uniqueObjectOrder,'total'), reduceHelper, 0)
    _totalCredited = _.reduce(_.pluck(uniqueObjectCredit,'amount'), reduceHelper, 0)

    newObj.totalOrdered = _totalOrdered
    newObj.totalCredited = _totalCredited

    finalAccounts.push(newObj)

    newObj = null

  console.log finalAccounts;

  final = message(ordersString,creditsString)

  process.exit(0)

###
  mailer 'sidsb94@gmail.com', final, (err, response) ->
  console.log 'response', response
###