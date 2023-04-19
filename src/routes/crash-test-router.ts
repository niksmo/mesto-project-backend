import express from 'express';

const crashTestRouter = express.Router();

crashTestRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

export default crashTestRouter;
