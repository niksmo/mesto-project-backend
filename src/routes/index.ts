import express from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import authRouter from './auth-router';
import cardsRouter from './cards-router';
import usersRouter from './users-router';

const router = express.Router();

router.use(authRouter);

router.use(authMiddleware);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;
