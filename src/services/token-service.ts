import jwt from 'jsonwebtoken';
import ApiError from '../exceptions/api-error';

interface IAccessToken {
  accessToken: string;
}

function generateToken(userId: string): IAccessToken {
  const { JWT_ACCESS_SECRET = 'jwt-secret-key' } = process.env;

  try {
    const accessToken = jwt.sign({ _id: userId }, JWT_ACCESS_SECRET, {
      expiresIn: '7d',
    });

    return { accessToken };
  } catch (error) {
    throw ApiError.InternalError();
  }
}

export default { generateToken };
