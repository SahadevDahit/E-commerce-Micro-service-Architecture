import exppress from "express";
import {
    createReviewCtrl,
    // updateReviewCtrl,
    // deleteReviewCtrl,
    getReviewCtrl,
    getSingleReview,
    getReviewsOfProductCtrl,

} from "../controllers/reviews.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const reviewRouter = exppress.Router();
reviewRouter.get('/', getReviewCtrl);
reviewRouter.get('/:id', getSingleReview);
reviewRouter.get('/product/:productId', getReviewsOfProductCtrl);

// reviewRouter.put('/:id', isLoggedIn, updateReviewCtrl);
// reviewRouter.delete('/:id', isLoggedIn, deleteReviewCtrl);

reviewRouter.post("/:productId", isLoggedIn, createReviewCtrl);

export default reviewRouter;