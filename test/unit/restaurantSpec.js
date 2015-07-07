var assert = require('assert');

describe('Restaurant spec', function () {

	beforeEach(function (done) {
		var createRestaurant = require('../../lib/rvce_menu_creation').create;

		createRestaurant("test", function  (err) {
			if(err === false) {
				done();
			} else {
				throw new Error("error creating restaurants");
			}
		});
	});

	afterEach(function (done) {
		var mongoose = require('mongoose');
		var Restaurant = mongoose.model('Restaurant');

		Restaurant.findOneAndRemove({name: "test"}, function  (err, rest) {
			if(err) { 
				throw new Eror("Error deleting restaurants"); 
			} 

			done();

		})
	});

	it('should filter out menu and admin', function  (done) {
		// body...
		var 
	})
});