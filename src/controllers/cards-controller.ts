import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';
import { isReqWithUser } from '../middlewares/auth-middleware';
import cardService from '../services/card-service';

interface IPostCardReqBody {
  name: string;
  link: string;
}

async function postCard(req: Request, res: Response, next: NextFunction) {
  if (isReqWithUser<any, IPostCardReqBody>(req)) {
    try {
      const { name, link } = req.body;
      const { _id: ownerId } = req.user;
      const preservedCard = await cardService.postCard({ name, link, ownerId });
      res.status(201).send(preservedCard);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

async function getCards(req: Request, res: Response, next: NextFunction) {
  if (isReqWithUser(req)) {
    try {
      const preservedCards = await cardService.getCards();
      res.send(preservedCards);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

interface ICardIdParams {
  cardId: string;
}

async function deleteCard(
  req: Request<ICardIdParams>,
  res: Response,
  next: NextFunction
) {
  if (isReqWithUser<ICardIdParams>(req)) {
    try {
      const { cardId } = req.params;
      const preservedCards = await cardService.deleteCard(cardId);
      res.send(preservedCards);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

async function likeCard(
  req: Request<ICardIdParams>,
  res: Response,
  next: NextFunction
) {
  if (isReqWithUser<ICardIdParams>(req)) {
    try {
      const { _id: userId } = req.user;
      const { cardId } = req.params;
      const preservedCards = await cardService.likeCard({ cardId, userId });
      res.send(preservedCards);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

async function dislikeCard(
  req: Request<ICardIdParams>,
  res: Response,
  next: NextFunction
) {
  if (isReqWithUser<ICardIdParams>(req)) {
    try {
      const { _id: userId } = req.user;
      const { cardId } = req.params;
      const preservedCards = await cardService.dislikeCard({ cardId, userId });
      res.send(preservedCards);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

export default { postCard, getCards, deleteCard, likeCard, dislikeCard };
