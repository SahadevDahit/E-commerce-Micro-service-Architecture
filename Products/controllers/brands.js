import Brand from "../models/brands.js";
import asyncHandler from "express-async-handler";
import Category from "../models/category.js";

// Get a brand by ID
export const getBrandById = asyncHandler(async (req, res) => {

    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({
                error: "Brand not found"
            });
        }
        res.json(brand);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});
export const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Create a new brand
export const createBrand = asyncHandler(async (req, res) => {
    const {
        name,
        categoryName
    } = req.body;
    try {
        // Check if the brand with the same name already exists
        const existingBrand = await Brand.findOne({
            name
        });
        if (existingBrand) {
            return res.status(400).json({
                error: "Brand already exists"
            });
        }
        const category = await Category.findOne({
            name: categoryName
        });
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        // Create the brand
        const new_brand = await Brand.create({
            name
        });
        await Category.findOneAndUpdate({
            name: categoryName
        }, {
            $push: {
                brands: new_brand.id
            }
        }, {
            new: true
        });
        res.status(201).json(new_brand);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});


// Update a brand
export const updateBrand = asyncHandler(async (req, res) => {

    const {
        name
    } = req.body;
    try {
        const brand = await Brand.findByIdAndUpdate(
            req.params.id, {
                name
            }, {
                new: true
            }
        );
        if (!brand) {
            return res.status(404).json({
                error: "Brand not found"
            });
        }
        res.json(brand);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Delete a brand
export const deleteBrand = asyncHandler(async (req, res) => {

    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({
                error: "Brand not found"
            });
        }
        res.json({
            message: "Brand deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});