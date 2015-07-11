var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.loadFromPath(__dirname + '/../aws_config.json');

exports.put = function  (filePath, dest, cb) {
	var stream = fs.createReadStream(filePath);

	stream.on('error', function  (err) {
		cb(true, err);
	})

	stream.on('open', function  () {
		var s3 = new AWS.S3();

		s3.putObject({
			Bucket: 'viands',
			Key: dest,
			ACL: 'public-read',
			Body: stream
		}, function  (err) {
			if(err) {
				cb(true, err);
			} else {
				cb(null, "done");
			}
		})
	})
}