import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import Book from '../models/book';
import IBook from '../interfaces/book';
import ApiError from '../errors/ApiError';
import WriteServerResponse from '../helpers/response';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { author, title }: IBook = req.body;
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            author,
            title
        });
        const result = await book.save();
        const serverResponse = { result: result, statusCode: 201, contentType: 'application/json' };
        return WriteServerResponse(res, serverResponse);
    } catch (err) {
        next(ApiError.internal(`Something went wrong: ${err.message}`));
        return;
    }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await Book.find({});
        if (books) {
            const serverResponse = { result: books, statusCode: 200, contentType: 'application/json' };
            return WriteServerResponse(res, serverResponse);
        }
    } catch (error) {
        next(ApiError.internal(`Something went wrong: ${error.message}`));
        return;
    }
};

export default { createBook, getAllBooks };
