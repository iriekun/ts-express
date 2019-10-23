import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './../config';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }
  const token = bearer.split('Bearer ')[1].trim();
  if (!token)
    return res
      .status(401)
      .send('Access denied! No token provided! ')
      .end();
  try {
    const decoded = jwt.verify(token, config.secrets.jwt);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send('Invalid token');
  }
};

export default auth;
