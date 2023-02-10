import express from 'express';
import cardsRouter from './cards';
import usersRouter from './users';

const router = express.Router();

router.use(usersRouter, cardsRouter);

export default router;
