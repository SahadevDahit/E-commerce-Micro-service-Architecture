import ApparelAndFashion from '../models/apparelAndFashion.js';
import asyncHandler from "express-async-handler"
import cloudinary from "../config/cloudinary.js";

import Product from "../models/products.js";
export const getAllApparelAndFashion = asyncHandler(async (req, res) => {
    const apparelAndFashion = await ApparelAndFashion.find();
    res.json(apparelAndFashion);
});

export const getApparelAndFashionById = asyncHandler(async (req, res) => {
    try {
        const apparelAndFashion = await ApparelAndFashion.findById(req.params.id);
        if (!apparelAndFashion) {
            res.status(404).json({
                error: 'Apparel and fashion product not found'
            });
            return;
        }
        res.json(apparelAndFashion);
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});

export const createApparelAndFashion = asyncHandler(async (req, res) => {
    try {
        let userAuthId = req.get('user-auth-id')
        let image = "";
        if (req.file) {
            let images = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products'
            });
            image = images.secure_url;
            req.body.images = image;
            req.body.imageId = images.public_id;
        }

        req.body.sellerId = userAuthId;
        const apparelAndFashion = new ApparelAndFashion(req.body);
        const savedApparelAndFashion = await apparelAndFashion.save();

        // Create a new product associated with the apparel and fashion item
        const product = new Product({
            apparelAndFashion: savedApparelAndFashion.id, // Add the apparel and fashion item ID to the product
            ...req.body // Include other properties from req.body in the product
        });
        const savedProduct = await product.save();

        res.status(201).json({
            apparelAndFashion: savedApparelAndFashion,
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});

export const updateApparelAndFashion = asyncHandler(async (req, res) => {
    try {
        const apparelAndFashion = await ApparelAndFashion.findByIdAndUpdate(req.body.apparelAndFashion._id, req.body.apparelAndFashion, {
            new: true
        });
        if (!apparelAndFashion) {
            res.status(404).json({
                error: 'Apparel and fashion product not found'
            });
            return;
        }
          // Update the associated product with the updated book information
    const product = await Product.findOneAndUpdate({
        apparelAndFashion: req.body.apparelAndFashion._id
    }, req.body, {
        new: true
    });

        res.json({apparelAndFashion,product,message:"product updated successfully"});
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});

export const deleteApparelAndFashion = asyncHandler(async (req, res) => {
    try {
        const apparelAndFashion = await ApparelAndFashion.findByIdAndDelete(req.params.id);
        if (!apparelAndFashion) {
            res.status(404).json({
                error: 'Apparel and fashion product not found'
            });
            return;
        }
        res.json({
            message: 'Apparel and fashion product deleted'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});