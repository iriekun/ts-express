import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './../config';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied! No token provided! ');
  try {
    const decoded = jwt.verify(token, config.secrets.jwt);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send('Invalid token');
  }
};

export default auth;
