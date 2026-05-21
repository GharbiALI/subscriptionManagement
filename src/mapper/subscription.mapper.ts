import { ISubscription } from "../schemas/subscription.schemas";

export interface SubscriptionResponse {
  id: string;
  userId: string;
  product: {
    id: string;
    name: string;
    companyName: string;
    price: number;
  };
  startDate: Date;
  expiryDate: Date;
  status: "active" | "expired" | "cancelled";
}

export const mapSubscription = (
  subscription: ISubscription & { _id: any; productId: any },
): SubscriptionResponse => {
  return {
    id: subscription._id.toString(),
    userId: subscription.userId.toString(),
    product: {
      id: subscription.productId._id.toString(),
      name: subscription.productId.name,
      companyName: subscription.productId.companyName,
      price: subscription.productId.price,
    },
    startDate: subscription.startDate,
    expiryDate: subscription.expiryDate,
    status: subscription.status,
  };
};
