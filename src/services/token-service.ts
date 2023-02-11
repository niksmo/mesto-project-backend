import jwt from 'jsonwebtoken';
import ApiError from '../exceptions/api-error';

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
    throw ApiError.InternalError();
  }
}

function validateToken(accessToken: string): string {
  try {
    const userId = jwt.verify(accessToken, JWT_ACCESS_SECRET);

    if (typeof userId !== 'string') {
      return userId._id as string;
    }

    throw ApiError.Unauthorized();
  } catch (error) {
    throw ApiError.Unauthorized();
  }
}

export default { generateToken, validateToken };
