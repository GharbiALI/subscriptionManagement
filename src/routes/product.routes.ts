import { Router } from "express";
import { getProducts, createProduct } from "../controller/product.controller";
import { authenticate, authorizeAdmin } from "../auth/auth.middleware";
import { validateProductMiddleware } from "../middleware/product.middleware";

const router = Router();

// GET /api/products (public)
router.get("/", getProducts);

// POST /api/product (admin only)
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  validateProductMiddleware,
  createProduct,
);

export default router;
