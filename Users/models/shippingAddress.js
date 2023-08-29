import mongoose from "mongoose";
const Schema = mongoose.Schema;
const shippingAddressSchema = new Schema({

    streetName: {
        type: String,
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    province: {
        type: String,
    },
    country: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});

//compile the schema to model
const shippingAddress = mongoose.model("shippingAddress", shippingAddressSchema);

export default shippingAddress;