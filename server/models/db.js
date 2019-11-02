/**
 * Created by cpapernik on 9/13/16.
 */
'use strict';

const mongoose = require('mongoose');
const logger = require('../utils/logger').logger;

var gracefulShutdown;
var dbURI = process.env['MONGODB_URI'] || '';

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
// var options = {
//   server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 90000 } }
// };

// Connect to mongo
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Register connect handler
mongoose.connection.on('connected', function() {
  logger.info('Mongoose connected to ' + dbURI);
});

// Register error handler
mongoose.connection.on('error', function(err) {
  logger.error(err);
});

// Register disconnect handler
mongoose.connection.on('disconnected', function() {
  logger.info('Mongoose disconnected from ' + dbURI);
});

gracefulShutdown = function(msg, callback) {
  logger.info('Mongoose disconnecting as a result of ' + msg);
  mongoose.connection.close(function() {
    callback();
  });
};

// SIGINT Handler
process.on('SIGINT', function() {
  gracefulShutdown('receiving a SIGINT.', function() {
    process.exit(0);
  });
});

// SIGTERM Handler
process.on('SIGTERM', function() {
  gracefulShutdown('receiving a SIGTERM.', function() {
    process.exit(0);
  });
});
