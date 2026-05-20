import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware';
import { validateProductIdForCreateSubscription } from '../middleware/subscription.middlware';
import { createSubscription } from '../controller/subscription.controller';

const router = Router();

router.use(authenticate);

router.post('/buy', validateProductIdForCreateSubscription, createSubscription);

export default router;