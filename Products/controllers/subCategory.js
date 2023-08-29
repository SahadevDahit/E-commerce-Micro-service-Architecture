import SubCategory from "../models/subCategory.js";
import asyncHandler from "express-async-handler";
import Category from "../models/category.js";
import cloudinary from "../config/cloudinary.js";

// Get all sub-categories
const getAllSubCategories = asyncHandler(async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Create a new sub-category
const createSubCategory = asyncHandler(async (req, res) => {
    const {
        name,
        image,
        categoryName
    } = req.body;
    try {
        // Check if the category exists
        const category = await Category.findOne({
            name: categoryName
        });
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        const subCategoryFound = await SubCategory.findOne({
            name: name
        });
        if (subCategoryFound) {
            return res.status(404).json({
                error: "Sub Category already exists"
            });
        }
        if (req.file) {
            let subCategoryImage = await cloudinary.uploader.upload(req.file.path, {
                folder: 'subCategoryImage'
            });

            // Create the subcategory
            const new_subCategory = await SubCategory.create({
                name,
                image: subCategoryImage.secure_url
            });
            await Category.findOneAndUpdate({
                name: categoryName
            }, {
                $push: {
                    subCategory: new_subCategory.id
                }
            }, {
                new: true
            });
            res.status(201).json(new_subCategory);
        }
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

export {
    getAllSubCategories,
    createSubCategory
};