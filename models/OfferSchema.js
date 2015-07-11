var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OfferSchema = new mongoose.Schema({
	name: String,
	logo: String,
	desc: String,
	points: Number,
	terms: String,
	url: String
});

mongoose.model('Offer', OfferSchema);