import { Router } from "express";
import { register, login, profile } from "../controller/user.controller";
import { authenticate } from "../auth/auth.middleware";
import {
  validateUserMiddleware,
  validateUserLoginMiddleware,
} from "../middleware/user.middleware";
const router = Router();

router.post("/register", validateUserMiddleware, register);
router.post("/login", validateUserLoginMiddleware, login);
router.get("/profile", authenticate, profile);

export default router;
