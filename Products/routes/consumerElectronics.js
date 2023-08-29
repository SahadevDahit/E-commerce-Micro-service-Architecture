import {
    Router
} from 'express';
import upload from "../config/multer.js";

import {
    getAllConsumerElectronics,
    getConsumerElectronicsById,
    createConsumerElectronics,
    updateConsumerElectronics,
    deleteConsumerElectronics
} from '../controllers/consumerElectronics.js';

const router = Router();

// Route: GET /consumer-electronics
// Get all consumer electronics
router.get('/', getAllConsumerElectronics);

// Route: GET /consumer-electronics/:id
// Get a consumer electronics by ID
router.get('/:id', getConsumerElectronicsById);

// Route: POST /consumer-electronics
// Create a new consumer electronics
router.post('/',upload.single("productImage"), createConsumerElectronics);

// Route: PUT /consumer-electronics/:id
// Update a consumer electronics by ID
router.put('/', updateConsumerElectronics);

// Route: DELETE /consumer-electronics/:id
// Delete a consumer electronics by ID
router.delete('/:id', deleteConsumerElectronics);

export default router;