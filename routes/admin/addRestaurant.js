var express = require('express');
var fs = require('fs');
var csv = require('fast-csv');
var _ = require('underscore');
var mongoose = require('mongoose');

var Restaurant = mongoose.model('Restaurant');

var router = express.Router();

router.get('/', function  (req, res) {
	res.render('admin');
});

router.post('/', function  (req, res) {
	console.log('Here',	req.files);
	console.log('Body', req.body);

	var zipFile = {};
	var csvFile = {};

	var err = false;
	var menu = [];

	req.files.file.forEach(function  (file) {
		if (file.extension === 'zip') {
			zipFile = file;
		} 

		else if(file.extension === 'csv') {
			csvFile = file;
		}

		else {
			err = true;
		}

	});

	if(err === true) {
		console.log('Wrinf');
		res.json({
			err: true,
			msg: 'Wrong file'
		})
	} 
	else {
		var k = 0;

		workCsv(csvFile, function  (err, dataCsv) {
			menu = dataCsv;
			consolidate(err);
		})

		workZip(zipFile, function  (err) {
			consolidate(err);
		})
	}

	function consolidate (err) {
		if (err) {
			console.log('Consol', err);
			res.json({
				err: true,
				msg: err
			})
		} 

		else {
			k++;
		}

		if (k == 2) {
			makeRestaurant(menu, req.body.data);
			res.json({
				err: false,
				msg: 'Added successfully'
			})
		}
	}


})


function workCsv (csvFile, cb) {

	var stream = fs.createReadStream(csvFile.path);

	var menu = [];

	var done = 0;

	csv
		.fromStream(stream, {
			headers: true
		})
		.validate(function  (data) {
			// body...
			var keys = Object.keys(data);
			for (var i = 0; i < keys.length - 1; i++) {
				if (!data[keys[i]]) {
					done++;
					return false;
				}
			}	
			return true;
		})
		.on('data-invalid', function  (data) {
			if (done === 1) {
				console.log('h')
				cb("Missing some values")
			}
			
		})
		.on('data', function  (data) {
			data = _.mapObject(data,function  (v,k) {
				if(typeof(v) == 'string'){
					return v.trim();
				} else {
					return v;
				}
			});
			menu.push(data);
		})
		.on('end', function  () {
			console.log("end");
			if (done === 0) {
				cb(null, menu);
			};
		});

}

function workZip (zipFile, cb) {
	cb(null);
}

function makeRestaurant (menu, body, cb) {

	Restaurant.find({}, function  (err, rests) {
		if(err) {
			cb(err);
		} else {
			var r = {}

			r.name = body.name;
			r.sno = rests.length;
			r.lat = body.lat;
			r.lng = body.lng;
			r.location = body.location;
			r.rating = 1;
			r.num_review = 0;
			r.num_photos = 0;
			r.phone = body.number;
			r.close = true;
			r.menu = menu;

			r.admin = {
				username: body.usename,
				password: body.password
			}

			/**
			*
			* pull out category list
			*
			**/
			var categories = _.uniq(_.pluck(menu, 'category_name'));	
			
			r.category_list = categories;

			var rest = new Restaurant(r);
			rest.save();
		}
	})

	
}

module.exports = router;