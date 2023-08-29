import exppress from "express";
import {
    getCart,
    createCart,
    deleteCart,
    getCartById,
    updateCart
} from "../controllers/carts.js";

const CartRouter = exppress.Router();
CartRouter.get('/', getCart);
CartRouter.get('/:id', getCartById);
CartRouter.delete('/:id', deleteCart);
CartRouter.put('/:id', updateCart);

CartRouter.post("/", createCart);

export default CartRouter;