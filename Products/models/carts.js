//product schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
   
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },

}, {
    timestamps: true,
});


const Carts = mongoose.model("carts", CartSchema);

export default Carts;