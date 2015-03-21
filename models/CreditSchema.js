var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CreditSchema = new mongoose.Schema ({
	amount: Number,
	phone: Number,
	time: String
});

mongoose.model('Credit', CreditSchema);