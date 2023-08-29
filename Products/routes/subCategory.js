import express from "express";
import {
    getAllSubCategories,
    createSubCategory
} from "../controllers/subCategory.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getAllSubCategories);
router.post("/", upload.single('file'), createSubCategory);

export default router;