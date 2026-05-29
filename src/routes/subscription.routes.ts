import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import {
  validateProductIdForCreateSubscription,
  validateSubscriptionId,
} from "../middleware/subscription.middlware";
import {
  createSubscription,
  getActiveSub,
  getExpiredSub,
  cancelSub,
} from "../controller/subscription.controller";

const router = Router();

router.use(authenticate);

router.post("/subscriptions", validateProductIdForCreateSubscription, createSubscription);
router.get("/subscriptions/activation", getActiveSub);
router.get("/subscriptions/expiration", getExpiredSub);
router.patch("/subscriptions/:id/cancellation", validateSubscriptionId, cancelSub);

export default router;
