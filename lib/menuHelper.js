var mongoose = require('mongoose');

require('../app');

require('../models/RestaurantSchema');
var Restaurant = mongoose.model('Restaurant');

exports.findName = function  (id, cb) {
	Restaurant.find({}, function  (err, restaurants) {
		if (err) {
			cb(true, null);
			return;
		}

		var found = false;
		restaurants.forEach(function  (rest) {
			var menu = rest.menu;
			menu.forEach(function  (item) {
				if (item.item_id == id) {
					cb(false, item.name);
					found = true;
					return;
				}
			})
			if (!found) {
				cb(true, "Not Found");				
			}
			
		})
	})
}

exports.HashMap = function  (cb) {

	Restaurant.find({}, function  (err, restaurants) {
		if(!err) {
			var H = {};
			restaurants.forEach(function  (res) {
				res.menu.forEach(function  (item) {
					H[item.id] = {
						name: item.name,
						amount: item.cost
					}
				});
			});
		}

		cb(err, H)
	});
}