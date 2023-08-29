import {
    Router
} from 'express';
import upload from "../config/multer.js";

import {
    getAllApparelAndFashion,
    getApparelAndFashionById,
    createApparelAndFashion,
    updateApparelAndFashion,
    deleteApparelAndFashion,
} from '../controllers/apparelAndFashion.js';

const router = Router();

// Route: GET /apparelAndFashion
// Get all apparel and fashion products
router.get('/', getAllApparelAndFashion);

// Route: GET /apparelAndFashion/:id
// Get an apparel and fashion product by ID
router.get('/:id', getApparelAndFashionById);

// Route: POST /apparelAndFashion
// Create a new apparel and fashion product
router.post('/', upload.single("productImage"), createApparelAndFashion);

// Route: PUT /apparelAndFashion/:id
// Update an apparel and fashion product by ID
router.put('/', updateApparelAndFashion);

// Route: DELETE /apparelAndFashion/:id
// Delete an apparel and fashion product by ID
router.delete('/:id', deleteApparelAndFashion);

export default router;