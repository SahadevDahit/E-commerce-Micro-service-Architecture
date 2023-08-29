//category schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    }],
    brands: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "brands"
    }],

}, {
    timestamps: true
});

const Category = mongoose.model("category", CategorySchema);

export default Category;