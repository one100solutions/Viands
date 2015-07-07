var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

/**

	TODO:
	- sno
	- lat 
	- lng

**/


router.get('/', function  (req, res, next) {
	var params = ['name', 'location', '_id', 'close', 'location']

	Restaurant.find({}, params.join(' ') , function  (err, rest_list) {
		if (err) {
			res.json({
				err: false,
				msg: err
			})
		} else {
			
			res.json({
				err: false,
				msg: 'got the list',
				restaurants: rest_list
			})
		}
	})
});

module.exports = router;