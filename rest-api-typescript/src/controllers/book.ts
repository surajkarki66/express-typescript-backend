import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';

import Book from '../models/book';
import IBook from '../interfaces/book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { author, title }: IBook = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    Book.find()
        .exec()
        .then((books) => {
            return res.status(200).json({
                books: books,
                count: books.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getAllBooks };
