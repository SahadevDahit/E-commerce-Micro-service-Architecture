import asyncHandler from "express-async-handler";
import Review from "../models/reviews.js";
import Order from "../models/orders.js";
// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Private/Admin
export const getReviewCtrl = asyncHandler(async (req, res) => {
    const reviews = await Review.find();
    res.json({
        status: "success",
        message: "Reviews fetched successfully",
        reviews,
    });
})

export const getReviewsOfProductCtrl = asyncHandler(async (req, res) => {
    const {
        productId
    } = req.params;
    const reviews = await Review.find({productId});
    res.json({
        status: "success",
        message: "Reviews fetched successfully",
        reviews,
    });

})
export const getSingleReview = asyncHandler(async (req, res) => {
    const reviews = await Review.findById(req.params.id);
    res.json({
        status: "success",
        message: "reviews fetched successfully",
        reviews,
    });
});
export const createReviewCtrl = asyncHandler(async (req, res) => {
    const {
        message,
        rating
    } = req.body;
    const userAuthId = req.headers['user-auth-id'];
    const {
        productId
    } = req.params;
   
    const hasOrdered=await Order.countDocuments({orderedBy: userAuthId,productId})
        if(hasOrdered===0) {
            throw new Error("You have to ordered  this product at least once");
        }
  
    let reviewCount = 0;
         reviewCount=await Review.countDocuments({productId,userId:userAuthId});
   
    if (reviewCount >= 5) {
        throw new Error("You have already reviewed three times this product");
    }

    // create review
    const review = await Review.create({
        message,
        rating,
        userId:userAuthId,
        productId
    });
    res.status(201).json({
        success: true,
        message: "Review created successfully",
    });
});
// export const updateReviewCtrl = asyncHandler(async (req, res) => {
//     const {
//         message,
//         rating
//     } = req.body;

//     //update
//     const reviews = await Review.findByIdAndUpdate(
//         req.params.id, {
//             message,
//             rating,
//         }, {
//             new: true,
//         }
//     );
//     res.json({
//         status: "success",
//         message: "reviews updated successfully",
//         reviews,
//     });

// })

// export const deleteReviewCtrl = asyncHandler(async (req, res) => {
//     await Review.findByIdAndDelete(req.params.id);
//     res.json({
//         status: "success",
//         message: "Review deleted successfully",
//     });


// })