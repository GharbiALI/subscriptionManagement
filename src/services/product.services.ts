import {
  findAllActiveProducts,createProduct
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
