import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    placeOrder,
    placeOrderOfCartItem
} from '../controllers/products.js';

const router = express.Router();
router.post('/order', placeOrder);
router.post('/orderCartItems', placeOrderOfCartItem);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;