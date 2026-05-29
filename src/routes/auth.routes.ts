import { Router } from "express";
import { register, login, profile } from "../controller/user.controller";
import {
  validateUserMiddleware,
  validateUserLoginMiddleware,
} from "../middleware/user.middleware";
const router = Router();

router.post("/registration", validateUserMiddleware, register);
router.post("/login", validateUserLoginMiddleware, login);

export default router;
