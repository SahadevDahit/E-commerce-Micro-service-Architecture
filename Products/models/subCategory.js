//category schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: true,
    }

}, {
    timestamps: true
});

const subCategory = mongoose.model("subCategory", subCategorySchema);

export default subCategory;