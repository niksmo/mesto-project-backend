import { NextFunction, Request, Response } from 'express';

type TRequestWithUser<P = Record<string, string>, T = any> = Request<
  P,
  any,
  T
> & {
  user: {
    _id: string;
  };
};

function fakeAuthUser(req: Request, res: Response, next: NextFunction) {
  (req as TRequestWithUser).user = {
    _id: '63e403205345084741841359',
  };
  next();
}

export function isReqWithUser<P = Record<string, string>, T = any>(
  req: Request<P>
): req is TRequestWithUser<P, T> {
  return 'user' in req || false;
}

export default fakeAuthUser;
