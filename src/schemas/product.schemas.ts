import { Schema, model } from 'mongoose';

export interface IProduct {
  name: string;
  companyName: string;
  price: number;
  description?: string;
  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export const Product = model<IProduct>('Product', productSchema);