/**
 * Created by cpapernik on 9/11/16.
 */
'use strict';
const winston = require('winston');

const logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      colorize: true,
      handleExceptions: true,
      json: false,
      level: logLevel,
      timestamp: true
    })
  ]
});

// For morgan to stream logging to
logger.stream = {
  write: function(message) {
    logger.info(message.replace(/\n$/, ''));
  }
};

logger.info('Logger started.  LOG_LEVEL = ' + logLevel);

module.exports = {
  logger: logger
};
