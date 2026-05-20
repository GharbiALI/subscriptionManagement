import { Subscription, ISubscription } from '../schemas/subscription.schemas';

export const findActiveSubscriptionByUserAndProduct = async (
  userId: string,
  productId: string
): Promise<ISubscription | null> => {
  return await Subscription.findOne({ userId, productId, status: 'active' });
};

export const createSubscription = async (subData: Partial<ISubscription>): Promise<ISubscription> => {
  const subscription = new Subscription(subData);
  return await subscription.save();
};

export const findSubscriptionById = async (id: string): Promise<ISubscription | null> => {
  return await Subscription.findById(id).populate('productId');
};