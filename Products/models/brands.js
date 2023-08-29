//Brand schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});

const Brand = mongoose.model("brands", BrandSchema);

export default Brand;