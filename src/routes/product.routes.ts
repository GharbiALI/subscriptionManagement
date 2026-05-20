import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
} from "../controller/product.controller";
import { authenticate, authorizeAdmin } from "../auth/auth.middleware";
import {
  validateProductMiddleware,
  validateIdMiddleware,
  validateUpdateProductBody,
} from "../middleware/product.middleware";

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
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  validateIdMiddleware,
  validateUpdateProductBody,
  updateProduct,
);

export default router;
