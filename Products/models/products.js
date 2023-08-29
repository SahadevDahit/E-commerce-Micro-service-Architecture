//product schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    images: {
      type: String,
      required: false,
    },
    imageId: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    books: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },

    consumerElectronics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumerElectronics",
    },
    apparelAndFashion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "apparelAndFashion",
    },
    colors: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
//Virtuals
//qty left
ProductSchema.virtual("qtyLeft").get(function () {
  const product = this;
  return product.totalQty - product.totalSold;
});
//Total rating
ProductSchema.virtual("totalReviews").get(function () {
  const product = this;
  return product?.reviews?.length;
});
//average Rating
ProductSchema.virtual("averageRating").get(function () {
  let ratingsTotal = 0;
  const product = this;
  product?.reviews?.forEach((review) => {
    ratingsTotal += review?.rating;
  });
  //calc average rating
  const averageRating = Number(ratingsTotal / product?.reviews?.length).toFixed(
    1
  );
  return averageRating;
});
const Product = mongoose.model("products", ProductSchema);

export default Product;
