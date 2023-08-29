import asyncHandler from "express-async-handler";
import Coupon from "../models/coupons.js";


export const createCouponCtrl = asyncHandler(async (req, res) => {
    const {
        code,
        startDate,
        endDate,
        discount
    } = req.body;
    const sellerAuthId = req.headers['user-auth-id'];

    if(!sellerAuthId){
        throw new Error("Login First");
    }
    //check if coupon already exists
    const couponsExists = await Coupon.findOne({
        code:code.toUpperCase()
    });
    if (couponsExists) {
        throw new Error("Coupon already exists");
    }
    //check if discount is a number
    if (Number.isInteger(discount)) {
        throw new Error("Discount value must be a number");
    }
    //create coupon
    const coupon = await Coupon.create({
        code: code.toUpperCase(),
        startDate,
        endDate,
        discount,
        sellerId: sellerAuthId,
    });
    //send the response
    res.status(201).json({
        status: "success",
        message: "Coupon created successfully",
        coupon,
    });
});

export const validateCoupon = asyncHandler(async (req, res) => {
    const {
        coupon,
        sellerId
    } = req.body;
    const userAuthId = req.headers['user-auth-id'];
    if(!userAuthId){
        throw new Error("Login First");
    }

    const couponFound = await Coupon.findOne({
        code: coupon.toUpperCase(),
        sellerId
    });
    if(!couponFound){
        throw new Error("Coupon does not exists or not authorized");
    }
    if (couponFound?.isExpired) {
        throw new Error("Coupon has expired");
    }
    if (!couponFound) {
        throw new Error("Coupon does exists");
    }
    //coupon code valid only for the product of seller, the coupon code by the same seller

    if (!couponFound.sellerId.equals(sellerId)) {
        throw new Error("coupon is not valid")
    }
    res.status(200).json({
        status: true,
        message: "valid coupon",
        couponFound
    })
});


export const getAllCouponsCtrl = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();
    res.status(200).json({
        status: "success",
        message: "All coupons",
        coupons,
    });
});

export const getAllCouponsByUser = asyncHandler(async (req, res) => {
    const sellerAuthId = req.headers['user-auth-id'];

    const coupons = await Coupon.find({
        sellerId: sellerAuthId
    });
    res.status(200).json({
        status: "success",
        message: "All coupons",
        coupons,
    });

})


export const getCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findOne({
        code: req.params.code,
    });
    //check if is not found
    if (coupon === null) {
        throw new Error("Coupon not found");
    }
    //check if expired
    if (coupon.isExpired) {
        throw new Error("Coupon Expired");
    }

    res.json({
        status: "success",
        message: "Coupon fetched",
        coupon,
    });
});

export const updateCouponCtrl = asyncHandler(async (req, res) => {
    const {
        code,
        startDate,
        endDate,
        discount
    } = req.body;
    const coupon = await Coupon.findByIdAndUpdate(
        req.params.id, {
            code: code?.toUpperCase(),
            discount,
            startDate,
            endDate,
        }, {
            new: true,
        }
    );
    if (coupon == null) {
        throw new Error("Coupon not exists")
    }
    res.json({
        status: "success",
        message: "Coupon updated successfully",
        coupon,
    });
});

export const deleteCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Coupon deleted successfully",
        coupon,
    });
});