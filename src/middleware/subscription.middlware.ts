import { Request, Response, NextFunction } from "express";
import {
  isvalidateId
} from "../validator/product.validator";

export const validateProductIdForCreateSubscription = (
  req: Request,
  res: Response,
  next: NextFunction,
):void => {
  const { productId } = req.body;
    if (isvalidateId(productId)) {
       res.status(400).json({ error: "Valid productId is required" });
       return;
    }
    next();
};

export const validateSubscriptionId = (
  req: Request,
  res: Response,
  next: NextFunction,
):void => {
  const { id } = req.params;
    if (isvalidateId(id)) {
       res.status(400).json({ error: "Valid subscription ID is required" });
       return;
    }
    next();
};