import Category from "../models/category.js";
import asyncHandler from "express-async-handler";

// Get all categories
export const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find().populate("subCategory brands");
        res.json(categories);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

export const getCategoryByName = asyncHandler(async (req, res) => {
    const categoryName = req.params.name;
    try {
        const category = await Category.findOne({
            name:categoryName
        }).populate("subCategory brands");
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        
        res.json(category);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Create a new category
export const createCategory = asyncHandler(async (req, res) => {
    const {
        name
    } = req.body;
    try {
        const existingCategory = await Category.findOne({
            name
        });
        if (existingCategory) {
            return res.status(400).json({
                error: "Category already exists"
            });
        }

        const category = await Category.create({
            name
        });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Update a category
export const updateCategory = asyncHandler(async (req, res) => {

    const {
        name,
    } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, {
                name,
            }, {
                new: true
            }
        ).populate("subCategory brands");
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Delete a category
export const deleteCategory = asyncHandler(async (req, res) => {

    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});