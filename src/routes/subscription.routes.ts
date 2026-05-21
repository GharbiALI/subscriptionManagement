import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware';
import { validateProductIdForCreateSubscription } from '../middleware/subscription.middlware';
import { createSubscription,getActiveSub,getExpiredSub } from '../controller/subscription.controller';

const router = Router();

router.use(authenticate);

router.post('/buy', validateProductIdForCreateSubscription, createSubscription);
router.get('/active', getActiveSub);
router.get("/expired", getExpiredSub);

export default router;