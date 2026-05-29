import { Router } from "express";
import { profile } from "../controller/user.controller";
import { authenticate } from "../auth/auth.middleware";

const router = Router();
router.use(authenticate);

router.get("/profile", profile);

export default router;
