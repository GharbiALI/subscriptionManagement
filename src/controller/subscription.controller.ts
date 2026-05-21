import { Response, NextFunction } from "express";
import { subscribe,getActiveSubscriptions } from "../services/subscription.services";
import { Product } from "../schemas/product.schemas";
import { AuthRequest } from "../auth/auth.middleware";
import { findActiveSubscriptionByUserAndProduct } from "../repository/subscription.repository";

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