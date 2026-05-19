import { Router } from "express";
import { register,login} from "../controller/user.controller";
import { validateUserMiddleware,validateUserLoginMiddleware } from "../middleware/user.middleware";
const router = Router();


router.post("/register", validateUserMiddleware, register);
router.post("/login", validateUserLoginMiddleware, login);


export default router;
