import {
  findAllActiveProducts
} from "../repository/product.repository";
import { IProduct } from "../schemas/product.schemas";

export const listActiveProducts = async (): Promise<IProduct[]> => {
  return findAllActiveProducts();
};
