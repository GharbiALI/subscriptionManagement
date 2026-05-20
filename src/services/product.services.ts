import {
  findAllActiveProducts,
  createProduct,
  updateProductById,findProductById
} from "../repository/product.repository";
import { IProduct } from "../schemas/product.schemas";

export const listActiveProducts = async (): Promise<IProduct[]> => {
  return findAllActiveProducts();
};

export const addProduct = async (
  data: Partial<IProduct>,
): Promise<IProduct> => {
  return createProduct(data);
};

export const updateProduct = async (
  id: string,
  data: Partial<IProduct>,
): Promise<IProduct | null> => {
  return updateProductById(id, data);
};

export const softDeleteProductService = async (
  id: string,
): Promise<IProduct | null> => {
  return updateProductById(id, { isActive: false });
};

export const checkProductForSoftDelete = async (
  id: string,
): Promise<IProduct | "ALREADY_DELETED" | null> => {
  const product = await findProductById(id);

  if (!product) {
    return null;
  }

  if (!product.isActive) {
    return "ALREADY_DELETED";
  }

  return product;
};