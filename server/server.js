'use strict';

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./utils/logger').logger;

require('dotenv').config();
require('./models/db');

const routes = require('./routes');

const app = express();

// use morgan to log requests
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length]', {
    stream: logger.stream
  })
);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(compression());

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: 'X-Total-Count'
  })
);

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {} // Note error content is explicitly empty
  });
});

const PORT = process.env.SERVER_PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});

process.once('SIGUSR2', function() {
  server.close(function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
