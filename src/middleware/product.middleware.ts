import { Request, Response, NextFunction } from "express";
import { validateProductInput } from "../validator/product.validator";

export const validateProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, companyName, price, description, isActive } = req.body;
  const error = validateProductInput(
    name,
    companyName,
    price,
    description,
    isActive,
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }

  next();
};
