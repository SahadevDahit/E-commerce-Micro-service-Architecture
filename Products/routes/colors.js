import express from "express";
import {
    getColorById,
    createColor,
    updateColor,
    deleteColor,
    getAllColors,
} from "../controllers/colors.js";

const router = express.Router();

// GET all colors
router.get("/", getAllColors);

// GET a color by ID
router.get("/:colorId", getColorById);

// POST create a new color
router.post("/", createColor);

// PUT update a color
router.put("/:colorId", updateColor);

// DELETE a color
router.delete("/:colorId", deleteColor);

export default router;