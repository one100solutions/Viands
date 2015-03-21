module.exports = (to, message, callback) ->

	request = require 'request'

	request.get "http://alerts.springedge.com/api/v3/index.php?method=sms&api_key=A2fd82469ec2e10c8f5f8e38ecbb211b3&to=#{to}&sender=VIANDS&message=#{message}&format=json&custom=1,2&flash=0",(status, response, body) ->
		callback false, body