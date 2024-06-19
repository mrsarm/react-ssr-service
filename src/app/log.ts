import { createLogger, format, transports } from 'winston';

const { combine, colorize, errors, simple, printf } = format;

const NODE_ENV = process.env.NODE_ENV || "development";

export const LOG_LEVEL = process.env.LOG_LEVEL ?? (NODE_ENV === "development" ? "debug" : "info");

const consoleFormat = combine(
  errors({ stack: true }),
  NODE_ENV === "development" ? colorize() : simple(),
  printf(({ level, message, _timestamp, stack }) => {
    if (stack) {
      return `${level}: ${message} -\n${stack}`;
    }
    return `${level}: ${message}`;
  })
)

export const logger = createLogger({
  level: LOG_LEVEL,
  transports: [
    new transports.Console({ format: consoleFormat })
  ],
});
