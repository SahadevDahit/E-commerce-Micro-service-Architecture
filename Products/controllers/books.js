import {
    default as asyncHandler
} from 'express-async-handler';
import Book from '../models/books.js';
import Product from "../models/products.js";
import cloudinary from "../config/cloudinary.js";

// Controller function to get all books
export const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Controller function to get a book by ID
export const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(404).json({
            error: 'Book not found'
        });
        return;
    }
    res.json(book);
});

// Controller function to create a new book
export const createBook = asyncHandler(async (req, res) => {
    let userAuthId = req.get('user-auth-id')
    let image = "";
    if (req.file) {
        let images = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products'
        });
        image = images.secure_url;
        req.body.images = image;
        req.body.imageId = images.public_id;
    }

    req.body.sellerId = userAuthId;

    // Create a new book
    const book = new Book(req.body);
    const savedBook = await book.save();

    // Create a new product associated with the book and req.body
    const product = new Product({
        books: savedBook.id, // Add the book ID to the product
        ...req.body // Include other properties from req.body in the product
    });
    const savedProduct = await product.save();

    // Send the saved product as the response
    res.status(201).json(savedProduct);
});


// Controller function to update a book by ID
export const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.body.books._id, req.body.books, {
        new: true
    });
    if (!book) {
        res.status(404).json({
            error: 'Book not found'
        });
        return;
    }

    // Update the associated product with the updated book information
    const product = await Product.findOneAndUpdate({
        books: req.body.books._id
    }, req.body, {
        new: true
    });

    res.json({
        book,
        product,
        message: 'Book updated'
    });
});


// Controller function to delete a book by ID
export const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        res.status(404).json({
            error: 'Book not found'
        });
        return;
    }
    res.json({
        message: 'Book deleted'
    });
});