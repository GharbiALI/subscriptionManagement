import { Product, IProduct } from '../schemas/product.schemas';

export const findAllActiveProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ isActive: true });
};

