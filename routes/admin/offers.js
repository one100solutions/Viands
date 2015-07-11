var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Banner = mongoose.model('Banner');

var fs = require('fs');
var upload = require('../../lib/copyS3');

var AWS = require('aws-sdk');

AWS.config.loadFromPath(__dirname + '/../../aws_config.json');

/**
*
*todo: Route to create an offer 
*
**/

router.post('/createOffer', function  (req, res, next) {
	var file = req.files.file;
	req.body = JSON.parse(req.body.data);
		console.log('Files', req.files)
	console.log('Data', req.body)
	/**
	
		TODO:
		- Send pic to s3
	**/

	upload.put(file.path, 'offers/' + file.name, function  (err, msg) {
		if(err) {
			res.json({
				err: true,
				msg: err
			})
		}

		else {
			var b = new Offer();
		
			b.name = req.body.name;
			b.logo = 'offers/' + file.name;
			b.desc = req.body.desc;
			b.points = req.body.points;
			b.terms = req.body.terms;
			b.url = req.body.url;

			b.save(function  (err, b) {

				if (err) {
					res.json({
						err: true,
						msg: err
					})
				}else {

				res.json({
					err: false,
					msg: 'Done',
					banner: b
				})
			}
			});
		}
	})

})

/**
*
*todo:  Create banner
*
**/

router.post('/createBanner', function  (req, res) {
	console.log('Files', req.files)
	console.log('Data', req.body)

	var file = req.files.file;
	req.body = JSON.parse(req.body.data);
	/**
	
		TODO:
		- Send pic to s3
	**/

	upload.put(file.path, 'banners/' + file.name , function  (err, msg) {
		if(err) {
			res.json({
				err: true,
				msg: err
			})
		}

		else {
			var b = new Banner();
			
				b.name = req.body.name;
				b.url =  req.body.url;
				b.pic = 'banners/' + file.name;

				b.save(function  (err, b) {

					if (err) {
						res.json({
							err: true,
							msg: err
						})
					}else {

					res.json({
						err: false,
						msg: 'Done',
						banner: b
					})
				}
				});
		}
	})

	
})

module.exports = router;