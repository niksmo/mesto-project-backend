import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';

function failureRoute(req: Request, res: Response, next: NextFunction) {
  next(ApiError.BadRequest('Page not found'));
}

export default failureRoute;
