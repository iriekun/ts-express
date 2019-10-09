import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Logging...');
  next();
};

export default logger;
