import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../controllers/controllers-types';
import { UnauthorizedError } from '../exceptions/api-error';
import tokenService from '../services/token-service';

function authMiddleware(req: Request, Res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;

  if (accessToken) {
    try {
      const userId = tokenService.validateToken(accessToken);

      (req as RequestWithUser).user = { _id: userId };
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(new UnauthorizedError());
  }
}

export default authMiddleware;
