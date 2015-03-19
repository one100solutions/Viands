var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CreditSchema = new mongoose.Schema ({
	amount: Number,
	phone: Number
});

mongoose.model('Credit', CreditSchema);