const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: process.env.LOG_LEVEL || "silly",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.label({ label: "Indexer", message: true }),
    format.splat(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
  exceptionHandlers: [
    new transports.Console({
      format: format.errors(),
    }),
  ],
  rejectionHandlers: [new transports.Console()],
});

module.exports = {
  logger,
};
