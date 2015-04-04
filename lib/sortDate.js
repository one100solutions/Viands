/**
 * Created by akash on 3/4/15.
 */

var moment = require('moment');
var _ = require('underscore');

function sortAsDates (arr) {
    var arr = _.sortBy(arr, function(item) {
        return moment(item.time,"dddd, MMMM Do YYYY, h:mm:ss a").unix();
    } );

    return arr;
}

module.exports = sortAsDates;