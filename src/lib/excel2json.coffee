module.exports = (path2xlsx, callback) ->
	xlsxj = require 'xlsx-to-json'

	xlsxj
		input: path2xlsx
		output: null
		(err, result) ->
			if err
				callback 
					err: true,
					message: err
			else if result
				callback
					err: false,
					message: result