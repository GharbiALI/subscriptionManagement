import { Router } from "express";
import usersRoutes from "./user.routes";
import productRoutes from "./product.routes";
import subscriptionRoutes from "./subscription.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", usersRoutes);
router.use("/products", productRoutes);
router.use("/users", subscriptionRoutes);

export default router;
