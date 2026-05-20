import { Request, Response, NextFunction } from "express";
import {
  validateProductInput,
  validateProductUpdateInput,
  isvalidateId
} from "../validator/product.validator";

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

export const validateUpdateProductBody = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, companyName, price, description, isActive } = req.body;

  if (
    name === undefined &&
    companyName === undefined &&
    price === undefined &&
    description === undefined &&
    isActive === undefined
  ) {
    res.status(400).json({ error: "At least one field is required to update" });
    return;
  }

  const error = validateProductUpdateInput(
    name,
    companyName,
    price,
    description,
    isActive,
  );

  if (error) {
     res.status(400).json({ error });
   
  }

  next();
};

export const validateIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { id } = req.params;
 if(isvalidateId(id)) {
    res.status(400).json({ error: "Invalid product ID" });
    return; 
  }
  next();
};
