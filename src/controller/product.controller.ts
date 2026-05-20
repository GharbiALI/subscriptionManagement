import { Request, Response, NextFunction } from "express";
import {
  listActiveProducts,
  addProduct,
  updateProduct as updateProductService,
} from "../services/product.services";
import { mapProductResponse } from "../mapper/product.mapper";

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await listActiveProducts();
    res.status(200).json({ data: products.map(mapProductResponse) });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json({ data: mapProductResponse(product) });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await updateProductService(req.params.id, req.body);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json({ data: mapProductResponse(product) });
  } catch (err) {
    next(err);
  }
};
