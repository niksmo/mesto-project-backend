import jwt from 'jsonwebtoken';
import { InternalError, UnauthorizedError } from '../exceptions/api-error';

interface IAccessToken {
  accessToken: string;
}

const { JWT_ACCESS_SECRET = 'jwt-secret-key' } = process.env;

function generateToken(userId: string): IAccessToken {
  try {
    const accessToken = jwt.sign({ _id: userId }, JWT_ACCESS_SECRET, {
      expiresIn: '7d',
    });

    return { accessToken };
  } catch (error) {
    throw new InternalError();
  }
}

function validateToken(accessToken: string): string {
  try {
    const userId = jwt.verify(accessToken, JWT_ACCESS_SECRET);

    if (typeof userId !== 'string') {
      return userId._id as string;
    }

    throw new UnauthorizedError();
  } catch (error) {
    throw new UnauthorizedError();
  }
}

export default { generateToken, validateToken };
