import { Response, NextFunction } from 'express';
import { RequestWithUser } from './controllers-types';
import ApiError from '../exceptions/api-error';
import cardService from '../services/card-service';

interface IPostCardReqBody {
  name: string;
  link: string;
}

async function postCard(
  req: RequestWithUser<never, IPostCardReqBody>,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
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

async function getCards(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
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

async function deleteCard(
  req: RequestWithUser<{ cardId: string }>,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    try {
      const { cardId } = req.params;
      const { _id: userId } = req.user;
      const preservedCard = await cardService.deleteCard({ cardId, userId });
      res.send(preservedCard);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

async function likeCard(
  req: RequestWithUser<{ cardId: string }>,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    try {
      const { _id: userId } = req.user;
      const { cardId } = req.params;
      const preservedCard = await cardService.likeCard({ cardId, userId });
      res.send(preservedCard);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

async function dislikeCard(
  req: RequestWithUser<{ cardId: string }>,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    try {
      const { _id: userId } = req.user;
      const { cardId } = req.params;
      const preservedCard = await cardService.dislikeCard({ cardId, userId });
      res.send(preservedCard);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

export default { postCard, getCards, deleteCard, likeCard, dislikeCard };
