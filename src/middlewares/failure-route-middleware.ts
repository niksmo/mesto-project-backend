import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../exceptions/api-error';

function failureRoute(req: Request, res: Response, next: NextFunction) {
  next(new BadRequestError('Page not found'));
}

export default failureRoute;
