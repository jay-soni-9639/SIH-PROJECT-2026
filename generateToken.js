import jwt from 'jsonwebtoken';

/**
 * Generate a signed JWT token
 * @param {Object} payload - User identification and role
 * @returns {String} JWT Token
 */
export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'sih_super_secure_jwt_secret_key_2026_healthcare';
  const expiresIn = process.env.JWT_EXPIRE || '7d';

  return jwt.sign(payload, secret, {
    expiresIn,
  });
};
