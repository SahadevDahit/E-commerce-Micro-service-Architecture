import asyncHandler from 'express-async-handler'
import ConsumerElectronicsSchema from '../models/consumerElectronics.js';
import cloudinary from "../config/cloudinary.js";
import Product from '../models/products.js';
// Controller function to get all consumer electronics
export const getAllConsumerElectronics = asyncHandler(async (req, res) => {
    const consumerElectronics = await ConsumerElectronics.find();
    res.json(consumerElectronics);
});

// Controller function to get a consumer electronics by ID
export const getConsumerElectronicsById = asyncHandler(async (req, res) => {
    const consumerElectronics = await ConsumerElectronics.findById(req.params.id);
    if (!consumerElectronics) {
        res.status(404).json({
            error: 'Consumer electronics not found'
        });
        return;
    }
    res.json(consumerElectronics);
});

// Controller function to create a new consumer electronics
export const createConsumerElectronics = asyncHandler(async (req, res) => {
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
        const new_consumerElectronics = new ConsumerElectronicsSchema(req.body);
        const savedConsumerElectronics = await new_consumerElectronics.save();

        const new_product = new Product({
            consumerElectronics: savedConsumerElectronics.id, // Add the consumer electronics ID to the product
            ...req.body // Include other properties from req.body in the product
        });
        const savedProduct = await new_product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});


// Controller function to update a consumer electronics by ID
export const updateConsumerElectronics = asyncHandler(async (req, res) => {
    const new_consumerElectronics = await ConsumerElectronicsSchema.findByIdAndUpdate(req.body.consumerElectronics._id, req.body.consumerElectronics, {
        new: true
    });
    if (!new_consumerElectronics) {
        res.status(404).json({
            error: 'consumerElectronics not found'
        });
        return;
    }

    // Update the associated product with the updated book information
    const product = await Product.findOneAndUpdate({
        consumerElectronics: req.body.consumerElectronics._id,
    }, req.body, {
        new: true
    });

    res.json({
        new_consumerElectronics,
        product,
        message: 'Consumer electronics updated'
    });
});

// Controller function to delete a consumer electronics by ID
export const deleteConsumerElectronics = asyncHandler(async (req, res) => {
    const consumerElectronics = await ConsumerElectronics.findByIdAndDelete(req.params.id);
    if (!consumerElectronics) {
        res.status(404).json({
            error: 'Consumer electronics not found'
        });
        return;
    }
    res.json({
        message: 'Consumer electronics deleted'
    });
});