import { Router } from "express";
import usersRoutes from "./user.routes";
import productRoutes from "./product.routes";

const router = Router();

router.use("/user",usersRoutes);
router.use("/product", productRoutes);

export default router;