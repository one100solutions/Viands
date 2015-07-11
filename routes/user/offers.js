var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Banner = mongoose.model('Banner');

/**
*
* Route to get the beanners
*
**/

router.get('/banners', function  (req, res, next) {
	Banner.find({}, function  (err, banner) {
		if (err) {
			res.json({
				err: true,
				msg: err
			})
		} 
		else {
			res.json({
				err: false,
				msg: 'Got banners',
				banners: banner
			})
		}
	})
})

/**
*
* todo: route to get offer list
*
**/


router.get('/offers', function  (req, res) {
	
})

/**
*
* Route to get detail of one offer
*
**/


router.get('/offer', function  (req, res) {
	
})

module.exports = router;