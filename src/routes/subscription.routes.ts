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

router.post("/buy", validateProductIdForCreateSubscription, createSubscription);
router.get("/active", getActiveSub);
router.get("/expired", getExpiredSub);
router.patch("/:id/cancel", validateSubscriptionId, cancelSub);

export default router;
