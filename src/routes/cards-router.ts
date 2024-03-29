import express from 'express';
import cardsController from '../controllers/cards-controller';
import validationMiddleware from '../middlewares/validation-middleware';

const cardsRouter = express.Router();

cardsRouter.post(
  '/',
  validationMiddleware.postCardBody,
  cardsController.postCard
);

cardsRouter.get('/', cardsController.getCards);

cardsRouter.delete(
  '/:cardId',
  validationMiddleware.cardIdParams,
  cardsController.deleteCard
);

cardsRouter.put(
  '/:cardId/likes',
  validationMiddleware.cardIdParams,
  cardsController.likeCard
);

cardsRouter.delete(
  '/:cardId/likes',
  validationMiddleware.cardIdParams,
  cardsController.dislikeCard
);

export default cardsRouter;
