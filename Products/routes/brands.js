import express from "express";
import {
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
    getAllBrands
} from "../controllers/brands.js";

const router = express.Router();
// GET all brands
router.get("/", getAllBrands);
// GET a brand by ID
router.get("/:brandId", getBrandById);

// POST create a new brand
router.post("/", createBrand);

// PUT update a brand
router.put("/:brandId", updateBrand);

// DELETE a brand
router.delete("/:brandId", deleteBrand);

export default router;