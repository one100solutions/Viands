var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/viands');

require('./models/OrderSchema');
require('./models/RestaurantSchema');
require('./models/UserSchema');
require('./models/CreditSchema');
require('./models/NotificationSchema');

var routes = require('./routes/index');
var users = require('./routes/users');

var restaurants = require('./routes/restaurants');

var signup = require('./routes/signup');
var verify = require('./routes/verify');
var login = require('./routes/login');
var order = require('./routes/order');
var resend_otp = require('./routes/resend_otp');
var get_user_orders = require('./routes/get_order_history')
var get_credits = require('./routes/get_credits');
var register_gcm = require('./routes/register_gcm');
var notifications= require('./routes/notifications');

var new_restaurant = require('./routes/new_restaurant');
var login_restaurant = require('./routes/login_restaurant');
var add_credits = require('./routes/add_credits');
var get_orders = require('./routes/get_order');
var order_complete = require('./routes/order_complete');
var add_notification = require('./routes/add_notification');
var change_menu = require('./routes/change_menu');

var clear = require('./routes/clear_users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/restaurants', restaurants);

app.use('/signup', signup);
app.use('/verify', verify);
app.use('/login', login);
app.use('/order', order);
app.use('/resend_otp', resend_otp);
app.use('/user_orders', get_user_orders);
app.use('/get_credits', get_credits);
app.use('/notifications', notifications);

app.use('/register_gcm', register_gcm);

app.use('/new_restaurant', new_restaurant);
app.use('/login_restaurant', login_restaurant);
app.use('/add_credits', add_credits);
app.use('/get_order', get_orders);
app.use('/order_complete', order_complete);
app.use('/add_notification', add_notification);
app.use('/change_menu', change_menu);

app.use('/clear', clear);

// catch 404 and forward to error handler
app.use(function(req, res) {
    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
    res.json({
      err: true,
      message: 'No such route'
    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
