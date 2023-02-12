import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const loggsPath = path.join(__dirname, '..', 'logs');

const requestTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'request-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: path.join(loggsPath, 'request'),
});

const erorrTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: path.join(loggsPath, 'error'),
});

const requestLogger = expressWinston.logger({
  transports: [requestTransport],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [erorrTransport],
  format: winston.format.json(),
});

export default { requestLogger, errorLogger };
