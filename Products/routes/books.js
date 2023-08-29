import {
    Router
} from 'express';
import upload from "../config/multer.js";

import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/books.js';

const router = Router();

// Route: GET /books
// Get all books
router.get('/', getAllBooks);

// Route: GET /books/:id
// Get a book by ID
router.get('/:id', getBookById);

// Route: POST /books
// Create a new book
router.post('/', upload.single("productImage"), createBook);

// Route: PUT /books/:id
// Update a book by ID
router.put('/', updateBook);

// Route: DELETE /books/:id
// Delete a book by ID
router.delete('/:id', deleteBook);

export default router;