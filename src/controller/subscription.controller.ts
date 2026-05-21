import { Response, NextFunction } from "express";
import {
  subscribe,
  calculateHoursUntilExpiry,
  getActiveSubscriptions,
  getExpiredSubscriptions,
  cancelSubscription,
} from "../services/subscription.services";
import { Product } from "../schemas/product.schemas";
import { AuthRequest } from "../auth/auth.middleware";
import {
  findActiveSubscriptionByUserAndProduct,
  findSubscriptionById,
} from "../repository/subscription.repository";

export const createSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { productId } = req.body;
    const userId = req.user!.userId;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      res.status(404).json({ error: "Product not found or inactive" });
      return;
    }
    const existing = await findActiveSubscriptionByUserAndProduct(
      userId,
      productId,
    );
    if (existing) {
      res.status(409).json({
        error: "You already have an active subscription for this product",
      });
      return;
    }
    const result = await subscribe(userId, productId);
    res.status(201).json({ data: result });
  } catch (err) {
    next(err);
  }
};

export const getActiveSub = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const subscriptions = await getActiveSubscriptions(userId);
    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) {
    next(err);
  }
};

export const getExpiredSub = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const subscriptions = await getExpiredSubscriptions(userId);
    res.status(200).json({ data: subscriptions });
  } catch (err) {
    next(err);
  }
};

export const cancelSub = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const sub = await findSubscriptionById(id);
    if (!sub) {
      res.status(404).json({ error: "Subscription not found" });
      return;
    }
    if (sub.userId.toString() !== userId) {
      res
        .status(403)
        .json({ error: "You can only cancel your own subscriptions" });
      return;
    }
    if (sub.status !== "active") {
      res
        .status(400)
        .json({ error: "Only active subscriptions can be cancelled" });
      return;
    }
    if (calculateHoursUntilExpiry(sub.expiryDate) <= 48) {
      res
        .status(400)
        .json({
          error:
            "Cancellation is only allowed more than 48 hours before the renewal date",
        });
      return;
    }
    const result = await cancelSubscription(id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
