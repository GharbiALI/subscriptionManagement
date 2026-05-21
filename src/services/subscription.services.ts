import { ISubscription } from "../schemas/subscription.schemas";
import { createSubscription,findSubscriptionById,findActiveSubscriptionsByUser,findExpiredSubscriptions,updateSubscriptionStatus } from "../repository/subscription.repository";
import { SubscriptionResponse, mapSubscription, mapActiveSubscriptionResponse} from "../mapper/subscription.mapper";

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

export const getActiveSubscriptions = async (
  userId: string,
): Promise<string[]> => {
  const subs = await findActiveSubscriptionsByUser(userId);
  return subs.map((s) =>
    mapActiveSubscriptionResponse(s as ISubscription & {productId: any }),
  );
};


export const getExpiredSubscriptions = async (
  userId: string,
): Promise<SubscriptionResponse[]> => {
  const subs = await findExpiredSubscriptions(userId);
  return subs.map((s) =>
    mapSubscription(s as ISubscription & { _id: unknown; productId: any }),
  );
};

export const calculateHoursUntilExpiry = (expiryDate: Date): number => {
  const msOneHour = 1000 * 60 * 60;

  return (expiryDate.getTime() - Date.now()) / msOneHour;
};

export const cancelSubscription = async (
  subscriptionId: string,
): Promise<SubscriptionResponse> => {
  const updated = await updateSubscriptionStatus(subscriptionId, "cancelled");
  return mapSubscription(
    updated as ISubscription & { _id: unknown; productId: any },
  );
};
