var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new mongoose.Schema({
	title: String,
	message: String,
	time: String
});

mongoose.model('Notification', NotificationSchema);