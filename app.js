const path = require('path');

const express = require('express');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./server/routes.js');

const app = express();

// Set up HTML view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Uncomment after placing your favicon in `/public`.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Use for both service-worker and browser caching.
// See article: https://jakearchibald.com/2016/caching-best-practices/
var staticify = require('staticify')(path.join(__dirname, 'public'));
app.locals.getVersionedPath = staticify.getVersionedPath;
app.use(staticify.middleware);

// Start the route.
app.use('/', routes);

// Catch 404 and forward to error handler.
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle development errors. Print stacktrace.
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Handle production errors. No stacktraces are leaked to the user.
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
