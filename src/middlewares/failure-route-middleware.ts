import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../exceptions/api-error';

function failureRoute(req: Request, res: Response, next: NextFunction) {
  next(new NotFoundError('Page not found'));
}

export default failureRoute;
