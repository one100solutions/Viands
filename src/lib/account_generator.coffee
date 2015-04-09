
mongoose = require 'mongoose'

moment = require 'moment'

babyParse = require 'babyparse'

json2csv = require 'json2csv'
fastCsv = require 'fast-csv'

fs = require 'fs'

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
#omitPhone = [8970707712, 8277564501, 9986787295, 7411487928, 9482532445, 7259281007]
omitPhone = []

ordersString = '<br /> Order History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />'

creditsString = '<br /> Credit History-<br /> Phone &nbsp;&nbsp;&nbsp;&nbsp; Amount <br />'

OrderSumHistory = 0
CreditSumHistory = 0

order = (callback)->
	Orders.find {}, (err, orders) ->
		if err 
			throw new Error("Error occured", err)

		for order in orders
			if omitPhone.indexOf(order.phone) < 0

        OrderSumHistory += order.total_amount

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

      if omitPhone.indexOf(credit.phone) < 0

        CreditSumHistory += credit.amount

        if curDate.diff(dbDate,'days') is 0
          credited.push {
            phone: credit.phone
            amount: credit.amount
            time: credit.time
          }

        creditsString += "#{credit.phone} &nbsp;&nbsp;&nbsp;&nbsp; #{credit.amount} &nbsp;&nbsp;&nbsp;&nbsp; #{credit.time} <br />"

		callback null,credited




mail = (Account) ->
  ###totalOrderToday = Account.ordered
  totalCreditToday = Account.credited
  totalOrder = Account.totalOrdered
  totalCredit = Account.totalCredited###
  console.log(Account.records);

  csvStream = fastCsv.createWriteStream({headers:true})
  writableStream = fs.createWriteStream("account.csv")

  for record in Account.records
    csvStream.write(record)

  csvStream.end()

  mailString = mailString2 = ""
  mailString += "Phone &nbsp;&nbsp;&nbsp;&nbsp; Ordered &nbsp;&nbsp;&nbsp;&nbsp; Recharged <br />"
  for order in Account.records
    mailString += "#{order.phone} &nbsp;&nbsp;&nbsp;&nbsp; #{order.totalOrdered} &nbsp;&nbsp;&nbsp;&nbsp; #{order.totalCredited} <br />"

  mailString2 += "<br /> Today: <br /> Ordered #{Account.ordered} <br /> Recharged: #{Account.credited}  "
  mailString2 += "<br /> Cumulative: <br /> Ordered #{Account.totalOrdered} <br /> Recharged: #{Account.totalCredited}  "

  final = message(mailString,mailString2)

  mailer 'ashakdwipeea@gmail.com', final, (err, response) ->
    if(err)
      console.log(err)

    console.log 'response', response

async.parallel [order, credit], (err, results) ->

  #console.log 'results', results

  ordered = _.sortBy(ordered,'phone')

  credited = _.sortBy(credited, 'phone')

  i = 0

  totalOrderSum = 0
  totalCreditSum = 0

  uniquePhoneOrdered = _.uniq(_.pluck(ordered,'phone'), true)

  uniquePhoneCredited = _.uniq(_.pluck(credited,'phone'), true)

  uniquePhone = _.union(uniquePhoneCredited, uniquePhoneOrdered)

  finalAccounts = {}

  finalAccounts.records = []



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

    totalOrderSum += _totalOrdered
    totalCreditSum += _totalCredited

    newObj.totalOrdered = _totalOrdered
    newObj.totalCredited = _totalCredited

    finalAccounts.records.push(newObj)

    newObj = null

  finalAccounts.ordered = totalOrderSum
  finalAccounts.credited = totalCreditSum

  finalAccounts.totalOrdered = OrderSumHistory
  finalAccounts.totalCredited = CreditSumHistory

  mail(finalAccounts)
  console.log finalAccounts;


###
  mailer 'sidsb94@gmail.com', final, (err, response) ->
  console.log 'response', response
###