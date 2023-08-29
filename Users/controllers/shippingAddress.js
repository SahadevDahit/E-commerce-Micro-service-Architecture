import asyncHandler from "express-async-handler";
import shippingAddress from "../models/shippingAddress.js";
import users from "../models/users.js";
export const getSingleshippingAddress = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    console.log(userAuthId);
    //find the user
    const shipping_Address = await shippingAddress.findOne({
        userId: userAuthId
    });
    res.json({
        status: "success",
        message: "shippingAddress fetched successfully",
        shipping_Address
    });
});
export const createshippingAddressCtrl = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    const shipping_address = await shippingAddress.create({
        userId: userAuthId,
        streetName: req.body.streetName,
        city: req.body.city,
        zipCode: req.body.zipCode,
        province: req.body.province,
        country: req.body.country,
    });
    await users.findOneAndUpdate({
        _id: userAuthId
    }, {
        shippingAddress: shipping_address._id
    }, {
        new: true
    });
    res.json({
        status: "success",
        message: "ShippingAddress added successfully",
        shipping_address
    });
});
export const updateshippingAddressCtrl = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    let user = await shippingAddress.findOneAndUpdate({
        userId: userAuthId
    }, req.body, {
        new: true
    });
    res.json({
        status: "success",
        message: "shippingAddresss updated successfully",
    });

})