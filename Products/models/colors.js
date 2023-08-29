//Color schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Color = mongoose.model("colors", ColorSchema);

export default Color;