/**
 * Created by akash on 9/4/15.
 */
var Analytic = require('../modules/AnalyticsData')

var moment = require('moment')

var day = moment([2015, 04, 09])

Analytic.getCredits(day, function (err, credited, CreditSum) {
    console.log('abc',credited, CreditSum);
    process.exit(0)
})