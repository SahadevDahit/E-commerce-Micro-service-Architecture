import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000) + Date.now().toString();
const OrderSchema = new Schema({
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sellerId: {
        type: String,
        required: true
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coupons",
    },
    orderNumber: {
        type: String,
        default: randomTxt + randomNumbers,
    },
    paymentStatus: {
        type: String,
        default: "Not paid",
    },
    paymentMethod: {
        type: String,
        default: "Not specified",
    },
    quantityOrdered: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    totalPrice: {
        type: Number,
        default: 0.0,
    },
    currency: {
        type: String,
        default: "npr",
    },
    //For admin
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "processing", "shipped", "delivered"],
    },
    orderedAt: {
        type: Date,
        default: new Date(),
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

//compile to form model
const Order = mongoose.model("Orders", OrderSchema);

export default Order;