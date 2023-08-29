import Cart from "../models/carts.js";
import asyncHandler from 'express-async-handler';
import sendToQueue from '../rabbitmq/sendToQueue.js'

/* This code exports several functions that handle CRUD operations for a shopping cart feature in a web
application. */
export const createCart = asyncHandler(async (req, res) => {
    const {
        productId,
        quantity
    } = req.body;
    const customerAuthId = req.headers['user-auth-id'];
    if(!customerAuthId){
        throw new Error("Login first!!!")
    }
    const cartFound = await Cart.findOne({
        productId,customerId: customerAuthId
    });
    if (cartFound) {
        throw new Error("items already exists in cart");
    }
    const cartCount = await Cart.countDocuments({ productId, customerId: customerAuthId });
        
    if (cartCount >=25) {
        throw new Error("Cart items exceeded");

    }

    const queueName = 'carts';
    const cartItem = {
        productId: productId,
        customerId: customerAuthId,
    }
   
    if(quantity){
        cartItem.quantity = req.body?.quantity
    }
    sendToQueue(cartItem, queueName)

    res.json({
        status: "success",
        message: "cart created successfully",
    });

})

export const getCartById = asyncHandler(async (req, res) => {
    const carts = await Cart.findById(req.params.id);
    res.json({
        status: "success",
        message: "carts fetched successfully",
        carts,
    });
})
export const getCart = asyncHandler(async (req, res) => {
    const userAuthId = req.headers['user-auth-id'];
        if(!userAuthId){
            throw new Error("Login first!!!")
        }
    const carts = await Cart.find({
        customerId: userAuthId
    }).populate({
        path: "productId",
        select: "name _id images brand category subCategory price", // Specify the fields you want to select
      });
    res.json({
        status: "success",
        message: "carts fetched successfully",
        carts,
    });
});
export const deleteCart = asyncHandler(async (req, res) => {

    const carts = await Cart.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "carts deleted successfully",
        carts,
    });

})

export const updateCart = asyncHandler(async (req, res) => {
    try {
        let{_id,updatedQuantity}=req.body;
        if(!updatedQuantity){
            updatedQuantity=0;
        }
        const cartItem = await Cart.findByIdAndUpdate(_id, {
            quantity:updatedQuantity
        }, {
            new: true
        });
        if (!cartItem) {
            return res.status(404).json({
                error: "cartItem not found"
            });
        }
        res.json({
            status: "success",
            message: "carts quantity updated successfully",
        });


    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});