//Review Schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: {
       type:String,
       required: [true, "Please add a user"],
    },
    productId: {
      type:String,
      required: [true, "Please add a product"],
    },
    message: {
        type: String,
        required: [true, "Please add a message"],
    },
    rating: {
        type: Number,
        required: [true, "Please add a rating between 1 and 5"],
        min: 1,
        max: 5,
    },
}, {
    timestamps: true,
});

const Review = mongoose.model("reviews", ReviewSchema);

export default Review;