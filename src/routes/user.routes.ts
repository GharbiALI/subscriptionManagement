import { Router } from "express";
import { register} from "../controller/user.controller";
import { validateUserMiddleware } from "../middleware/user.middleware";
const router = Router();


router.post("/register", validateUserMiddleware, register);


export default router;
