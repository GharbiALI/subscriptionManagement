import { Product, IProduct } from '../schemas/product.schemas';

export const findAllActiveProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ isActive: true });
};

export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(productData);
  return await product.save();
};