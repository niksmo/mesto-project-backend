import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose, { Error } from 'mongoose';
import { errors } from 'celebrate';
import errorHandling from './middlewares/error-middleware';
import routes from './routes';
import { printInConsole } from './utils';
import loggerMiddleware from './middlewares/logger-middleware';

dotenv.config();

const { PORT = 3010, MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

mongoose.set('strictQuery', false);

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware.requestLogger);

app.use('/', routes);

app.use(loggerMiddleware.errorLogger);

app.use(errors());

app.use(errorHandling);

(async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);

    app.listen(Number(PORT), () => {
      printInConsole(`serve at ${PORT} port`);
    });
  } catch (error) {
    if (error instanceof Error.MongooseServerSelectionError) {
      printInConsole(`
    DB is unavailable
    error: ${error.message}
    `);
    }
  }
})();
