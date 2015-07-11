var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Banner = mongoose.model('Banner');

var fs = require('fs');

var AWS = require('aws-sdk');

AWS.config.loadFromPath(__dirname + '/../../aws_config.json');

/**
*
*todo: Route to create an offer 
*
**/

router.post('/createOffer', function  (req, res, next) {
	
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

	var stream = fs.createReadStream(file.path);

	stream.on('error', function  (err) {
		if (err) {
			res.json({
				err: true,
				msg: err
			})
		} 
	})

	stream.on('open', function  () {
		// body...
		var s3 = new AWS.S3();
		s3.putObject({
			Bucket: 'viands',
			Key: 'banners/' + file.name,
			Body: stream
		}, function  (err) {
			if (err) {
				res.json({
					err: true,
					msg: err
				})
			}

			else {
				var b = new Banner();
			
				b.name = req.body.name;
				b.url = req.body.url;
				b.pic = file.name;

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
	});

	
})

module.exports = router;