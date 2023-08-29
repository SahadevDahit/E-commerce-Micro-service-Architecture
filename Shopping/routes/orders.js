import exppress from "express";
import {
    getAllordersCtrl,
    getSingleOrderCtrl,
    updateOrderCtrlAdmin,
    getOrderStatsCtrl,
    getOrderByUser,
    getOrderStatsOFSeller,
    getOrdersOfCustomers

} from "../controllers/orders.js";

const orderRouter = exppress.Router();

orderRouter.get("/", getAllordersCtrl);
orderRouter.get("/user", getOrderByUser);
orderRouter.get("/sales/stats", getOrderStatsCtrl);
orderRouter.get("/sales/stats/seller", getOrderStatsOFSeller);
orderRouter.put("/:id", updateOrderCtrlAdmin);
orderRouter.get("/order/:id", getSingleOrderCtrl);
orderRouter.get("/orderOfCustomer", getOrdersOfCustomers);


export default orderRouter;