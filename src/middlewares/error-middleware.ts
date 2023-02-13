import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';

function errorHandling(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.status).send({ message: err.message });
    return;
  }

  if (err instanceof SyntaxError) {
    res.status(400).send({ message: err.message });
    return;
  }

  res.status(500).send({ message: 'Internal server error' });
}

export default errorHandling;
