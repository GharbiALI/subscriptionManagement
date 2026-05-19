import { Request, Response, NextFunction } from 'express';
import { validateUserInput } from '../validator/user.validator';


export const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {  name, email, password  } = req.body;
  const error = validateUserInput(name, email, password);
  
  if (error) {
    return res.status(400).json({ error: error });
  }
  next();
};

