import { Router } from 'express';
import { getProducts} from '../controller/product.controller';

const router = Router();

// GET /api/products  (public)
router.get('/', getProducts);

export default router;
