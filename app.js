var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Passport authentication packages
const passport = require('passport');

const session = require('express-session');
const localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var products = require('./routes/products');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var app = express();

//Configuration File Inclusion
var config = require('./config/configurations');


//MongoDb Connection Setup
mongoose.connect(config.db)
  .then(() =>  console.log('Application Connected to mlab db successfully'))
  .catch((err) => console.error(err));

//Configuration for View Engine Selections & Views Directory Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport configuration
app.use(session({
    secret: 'WU@#5573GfFT*9',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// reference User model
const User = require('./models/user');
passport.use(User.createStrategy());
// session management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', index);
app.use('/products', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
