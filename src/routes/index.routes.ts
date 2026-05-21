import { Router } from "express";
import usersRoutes from "./user.routes";
import productRoutes from "./product.routes";
import subscriptionRoutes from "./subscription.routes";

const router = Router();

router.use("/user", usersRoutes);
router.use("/product", productRoutes);
router.use("/subscription", subscriptionRoutes);

export default router;
