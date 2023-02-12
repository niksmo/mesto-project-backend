import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';
import tokenService from '../services/token-service';

type TRequestWithUser<P = Record<string, string>, T = any> = Request<
  P,
  any,
  T
> & {
  user: {
    _id: string;
  };
};

function authMiddleware(req: Request, Res: Response, next: NextFunction) {
  const { accessToken } = req.cookies as Record<string, string>;

  if (accessToken) {
    try {
      const userId = tokenService.validateToken(accessToken);

      (req as TRequestWithUser).user = { _id: userId };
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

export function isReqWithUser<P = Record<string, string>, T = any>(
  req: Request<P>
): req is TRequestWithUser<P, T> {
  return 'user' in req || false;
}

export default authMiddleware;
