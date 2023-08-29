import Color from "../models/colors.js";
import asyncHandler from "express-async-handler";

// Get all colors
export const getAllColors = asyncHandler(async (req, res) => {
    try {
        const colors = await Color.find();
        res.json(colors);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Get a color by ID
export const getColorById = asyncHandler(async (req, res) => {
    const {
        colorId
    } = req.params;
    try {
        const color = await Color.findById(colorId);
        if (!color) {
            return res.status(404).json({
                error: "Color not found"
            });
        }
        res.json(color);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Create a new color
export const createColor = asyncHandler(async (req, res) => {
    const {
        name
    } = req.body;
    try {
        // Check if the color with the same name already exists
        const existingColor = await Color.findOne({
            name
        });
        if (existingColor) {
            return res.status(400).json({
                error: "Color already exists"
            });
        }

        // Create the color
        const color = await Color.create({
            name
        });
        res.status(201).json(color);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});


// Update a color
export const updateColor = asyncHandler(async (req, res) => {
    const {
        colorId
    } = req.params;
    const {
        name
    } = req.body;
    try {
        const color = await Color.findByIdAndUpdate(colorId, {
            name
        }, {
            new: true
        });
        if (!color) {
            return res.status(404).json({
                error: "Color not found"
            });
        }
        res.json(color);
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Delete a color
export const deleteColor = asyncHandler(async (req, res) => {
    const {
        colorId
    } = req.params;
    try {
        const color = await Color.findByIdAndDelete(colorId);
        if (!color) {
            return res.status(404).json({
                error: "Color not found"
            });
        }
        res.json({
            message: "Color deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});