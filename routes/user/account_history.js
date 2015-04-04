/**
 * Created by akash on 3/4/15.
 */

var express = require('express');
var router = express.Router();

var AccountDetails = require('../../modules/getUserAccountDetails');

router.post('/',getAccount);

module.exports = router;

function getAccount (req, res) {
    if(req.body.token)
    {
        AccountDetails.getOrderAndCredits(req.body.token, function (response) {
            console.log(response);
            res.json(response);
        });
    }
    else
    {
        res.json({
            err: true,
            message: 'Missing Parameters'
        });
    }
}
