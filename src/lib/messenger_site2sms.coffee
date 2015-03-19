module.exports = (to, messages, callback) ->
	unirest = require 'unirest'

	url = "https://site2sms.p.mashape.com/index.php?msg= #{messages}&phone=#{to}&pwd=shakdwipeea&uid=8277564501"
	console.log url

	unirest.get(url)
	.header("X-Mashape-Key", "mIpJNN69V9mshQsuZoiAaCeAahrtp1kzyEmjsnbSeuE3eva5Lj")
	.header("Accept", "application/json")
	.end (result) -> 
	  console.log(result.status, result.headers, result.body);

	  if JSON.parse(result.body).response is 'done\n'
	  	callback false,null

	  else
	  	callback true,result.body