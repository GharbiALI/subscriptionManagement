import { ISubscription } from "../schemas/subscription.schemas";
import { createSubscription,findSubscriptionById } from "../repository/subscription.repository";
import { SubscriptionResponse, mapSubscription } from "../mapper/subscription.mapper";

export const subscribe = async (
  userId: string,
  productId: string,
): Promise<SubscriptionResponse> => {

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  const sub = await createSubscription({
    userId: userId as any,
    productId: productId as any,
    expiryDate,
  });
  const populatedSub = await findSubscriptionById((sub as any)._id.toString());
  return mapSubscription(
    populatedSub as ISubscription & { _id: unknown; productId: any },
  );
};