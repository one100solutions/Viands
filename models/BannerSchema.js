var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BannerSchema = new mongoose.Schema({
	name: String,
	url: String,
	pic: String
});

mongoose.model('Banner', BannerSchema);