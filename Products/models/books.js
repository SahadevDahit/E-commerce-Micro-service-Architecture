import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    author: {
        type: String,
    },
    publisher: {
        type: String,
    },
    edition: {
        type: String,
    },
    isbn: {
        type: String,
    },
    paperback: {
        type: Boolean,
    },
    noOfPages: {
        type: Number,
    },
    language: {
        type: String,
    }
});

const Book = mongoose.model('Books', bookSchema);

export default Book;