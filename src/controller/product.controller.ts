import { Request, Response, NextFunction } from "express";
import {
  listActiveProducts,
  addProduct,
  softDeleteProductService,
  updateProduct as updateProductService,
  checkProductForSoftDelete,
} from "../services/product.services";
import { mapProductResponse } from "../mapper/product.mapper";
import { IProduct } from "../schemas/product.schemas";

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

export const softDeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const checkProduct = await checkProductForSoftDelete(req.params.id);

    if (checkProduct === null) {
      res.status(404).json({
        error: "Product not found",
      });

      return;
    }

    if (checkProduct === "ALREADY_DELETED") {
      res.status(409).json({
        error: "Product is already deleted",
      });

      return;
    }
    const product = (await softDeleteProductService(req.params.id)) as IProduct;
    res.status(200).json({ data: mapProductResponse(product) });
  } catch (err) {
    next(err);
  }
};
