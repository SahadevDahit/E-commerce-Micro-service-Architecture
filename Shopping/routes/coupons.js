import exppress from "express";
import {
    createCouponCtrl,
    getAllCouponsCtrl,
    getCouponCtrl,
    updateCouponCtrl,
    deleteCouponCtrl,
    validateCoupon,
    getAllCouponsByUser
} from "../controllers/coupons.js";

const couponsRouter = exppress.Router();

couponsRouter.post("/", createCouponCtrl);

couponsRouter.get("/", getAllCouponsByUser);
couponsRouter.get("/all", getAllCouponsCtrl);
couponsRouter.put("/:id", updateCouponCtrl);
couponsRouter.delete("/:id", deleteCouponCtrl);
couponsRouter.get("/:code", getCouponCtrl);
couponsRouter.post("/validate", validateCoupon);
export default couponsRouter;