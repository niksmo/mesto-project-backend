import express from 'express';
import cardsController from '../controllers/cards';

const cardsRouter = express.Router();

cardsRouter.post('/cards', cardsController.postCard);

cardsRouter.get('/cards', cardsController.getCards);

cardsRouter.delete('/cards/:cardId', cardsController.deleteCard);

cardsRouter.put('/cards/:cardId/likes', cardsController.likeCard);

cardsRouter.delete('/cards/:cardId/likes', cardsController.dislikeCard);

export default cardsRouter;
