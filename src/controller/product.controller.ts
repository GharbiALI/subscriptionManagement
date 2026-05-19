import { Request, Response, NextFunction } from "express";
import {
  listActiveProducts
} from "../services/product.services";
import { mapProductResponse } from "../mapper/product.mapper";


export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await listActiveProducts();
    res.status(200).json({data: products.map(mapProductResponse) });
  } catch (err) {
    next();
  }
};
