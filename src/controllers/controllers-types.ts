import { Request } from 'express';

type ParamsDictionary = Record<string, string>;
type BodyDictionary = Record<string, string>;
type Query = {
  [key: string]: undefined | string | string[] | Query | Query[];
};

/**
 * P - params, B - body
 */
export interface RequestWithUser<
  P = ParamsDictionary,
  B = BodyDictionary,
  Q = Query
> extends Request<P, any, B, Q> {
  user?: { _id: string };
}

export default {};
