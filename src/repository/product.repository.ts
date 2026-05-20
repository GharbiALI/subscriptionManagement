import { Product, IProduct } from "../schemas/product.schemas";

export const findAllActiveProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ isActive: true });
};

export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  const product = new Product(productData);
  return await product.save();
};

export const updateProductById = async (
  id: string,
  productData: Partial<IProduct>,
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

export const findProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};
