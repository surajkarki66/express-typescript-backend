import mongoose, { Schema } from 'mongoose';

import logging from '../config/logging';
import IBook from '../interfaces/book';

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, require: true },
        price: { type: Number, required: true },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

BookSchema.post<IBook>('save', function () {
    logging.info('MongoDB', 'Checkout the book we just saved: ', this);
});

const bookModel = mongoose.model<IBook>('Book', BookSchema);

export default bookModel;
