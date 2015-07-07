var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

router.get('/', function  (req, res, next) {
	var rest_id = req.query.id;

	if(!rest_id) {
		console.log("Not found");
		res.json({
			err: true,
			msg: 'Params missin'
		})
	}

	else {
		var params = ['menu', 'category_list']

		Restaurant.findOne({_id: rest_id}, params.join(' ') , function  (err, restaurant) {
			if (err) {
				res.json({
					err: false,
					msg: err
				})
			} else {
				console.log(Object.keys(restaurant))
				res.json({
					err: false,
					msg: 'got the menu list',
					category_list: restaurant.category_list,
					menu: restaurant.menu
				})
			}
		})
	}
});

module.exports = router;