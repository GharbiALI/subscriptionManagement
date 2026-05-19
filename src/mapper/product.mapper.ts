import { IProduct } from "../schemas/product.schemas";

export interface ProductResponse {
  name: string;
  companyName: string;
  price: number;
  description?: string;
  isActive: boolean;
}

export const mapProductResponse = (product: IProduct): ProductResponse => {
  return {
    name: product.name,
    companyName: product.companyName,
    price: product.price,
    description: product.description,
    isActive: product.isActive,
  };
};
