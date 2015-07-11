var express = require('express');
var router = express.Router();

var token = require('../../lib/id2otp')(0, true, 10);

router.post('/', function  (req, res) {
	if (req.body.username === "admin" &&
		req.body.password === "admin") {
		res.json({
			err: false,
			token: token
		})
	} else {
		res.json({
			err: true,
			msg: 'Wrong password motherfucker'
		})
	}
});

module.exports = router;