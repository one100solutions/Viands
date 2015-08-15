var express = require('express')
var router = express.Router();

var moment = require('moment');

var gcm = require('../../lib/gcm');

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');

router.post('/', function  (req, res, next) {
	console.log('Rec')
	if (req.body.token && req.body.order_id) {

		User.findOne({
			token: req.body.token
		}, function  (err, user) {
			if(err || !user) {
				res.json({
					err: true,
					message: 'No Such user'
				})
			} else if(user) {

				//get all order ids
				var o_ids = user.orders.map(function  (order) {
					return order.id;
				})

				if (o_ids.indexOf(req.body.order_id) === -1) {
					res.json({
						err: true,
						message: 'You did not order this'
					})
					return;
				};

				//get user id
				var user_id = user.id;

				Order.findOne({
					id: req.body.order_id
				}, function  (err, order) {
					if(err || !order) {
						res.json({
							err: true,
							message: 'No such order'
						})
					} else if(order && order.type === 'later' && order.complete === false) {
						//check if it is already on tablet
						var now = new moment().add(5, 'hours').add(30, 'minutes');

						var order_time = new moment(order.time_deliver,'HH:mm').subtract(10,'minutes');
	                  	console.log("Order",order_time.format())
	                  	if (order_time.isBefore(now)) {
	                  		//can be cancelled
	                  		//cancel the order
         				   	order.cancel = true;
               				var amt = order.total_amount;

               				//refund the credits
               				user.credits += amt;
                    		user.save();

               				 gcm(8, 'Order '+ req.body.order_id +' Cancelled',
                    			 'Your order has been Cancelled and credits refunded', user.gcm_id);
               				 order.save();

               				 res.json({
               				 	err: false,
               				 	message: 'Order cancelled'
               				 })

	                  	} else {
	                  		//no cancelleation
	                    	res.json({
	                    		err: true,
	                    		message: 'The time for cancellation is over'
	                    	})
	                  	}
					} else {
						res.json({
							err: true,
							message: 'Such orders cannot be cancelled'
						})
					}
				})
			} else {
				res.json({
					err: true,
					message: 'You did not order this'
				})
			}
		})

	} else {
		res.json({
			err: true,
			message: 'Missing Params'
		})
	}
});

module.exports = router;