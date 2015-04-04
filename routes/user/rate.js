/**
 * Created by akash on 3/4/15.
 */
var express = require('express');
var router = express.Router();

router.post('/',rateDish);

module.exports = rateDish;

function rateDish (req, res) {
    if(req.body.order_id && req.body.restaurant_id)
    {

    }

    else
    {
        res.json({
            err: true,
            message: 'Missing Parameters'
        })
    }
}