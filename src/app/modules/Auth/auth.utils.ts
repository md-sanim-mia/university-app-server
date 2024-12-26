import jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  scrict: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, scrict, { expiresIn });
};
