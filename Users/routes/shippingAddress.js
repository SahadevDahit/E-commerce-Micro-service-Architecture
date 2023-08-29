import exppress from "express";
import {
    createshippingAddressCtrl,
    updateshippingAddressCtrl,
    getSingleshippingAddress
} from "../controllers/shippingAddress.js";

const shippingAddressRouter = exppress.Router();
shippingAddressRouter.get('/', getSingleshippingAddress);
shippingAddressRouter.put('/', updateshippingAddressCtrl);

shippingAddressRouter.post("/", createshippingAddressCtrl);

export default shippingAddressRouter;