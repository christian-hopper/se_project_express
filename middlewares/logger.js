const winston = require("winston");
const expressWinston = require("express-winston");

// Create a custom format for log messages
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.error?.stack || message}`;
  })
);

// Logs all requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: messageFormat,
    }),
  ],
});

// Logs all errors
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = { requestLogger, errorLogger };
