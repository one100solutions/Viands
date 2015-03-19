module.exports = (to, message, callback) ->

	request = require 'request'

	request.get "https://control.msg91.com/api/sendhttp.php?authkey=81123A0Lic9Q63l5505c468&mobiles=#{to}&message=#{message}&sender=Viands&route=template", (status, response, body) ->
		console.log 'Body is', body
		console.log 'Status', status
		callback false, body