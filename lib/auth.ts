import jwt from 'jsonwebtoken';

const secret = 'your-secret-key'; // Replace with a strong secret key

export const generateToken = (payload: Record<string, any>): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): Record<string, any> | null => {
  try {
    return jwt.verify(token, secret) as Record<string, any>;
  } catch (error) {
    return null;
  }
};
