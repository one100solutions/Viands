node_gcm = require 'node-gcm'

module.exports = (mode, message1, message2,  regId) ->

	msg = new node_gcm.Message()

	msg.addData 'mode', mode
	msg.addData 'key1', message1
	msg.addData 'key2', message2

	regIds = ['APA91bEYhgyaBcMfbRhMcelxGHIJVcEBGl32tWEQ2i43NcKcB-E4gpPZzTMLRqBKSh0KYH0ZVctSbAVzrKWhrde-ovEKUMYgGY_gAkfENpHfldlD-Aw-3OupK_YvybkxeQaVJ48nsEk92i3RXdPkIJtfQW-HV5ySlmqN21ALIr8fkU4HaRFoHZI']


	#For viands  AIzaSyDhBIeT9V1BIsDgHlrVDg2ErC4r6H2wSMM
	#For test AIzaSyDgz6cuPL0VYwFVXiBcdn1N8FLUwq7QblM
	sender = new node_gcm.Sender('AIzaSyDhBIeT9V1BIsDgHlrVDg2ErC4r6H2wSMM')

	sender.send msg, regId, (err, result) ->

		if err then console.log 'Error',err

		else 
			console.log 'Result:', result
