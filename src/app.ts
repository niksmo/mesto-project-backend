import express from 'express';
import mongoose, { Error } from 'mongoose';
import errorHandling from './middlewares/errorHandling';
import fakeAuthUser from './middlewares/fakeAuthUser';
import routes from './routes';
import { printInConsole } from './utils';

const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

mongoose.set('strictQuery', false);

const app = express();

app.use(fakeAuthUser);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

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
