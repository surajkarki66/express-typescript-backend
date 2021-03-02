import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, require: true }
    },
    {
        timestamps: true
    }
);

BookSchema.post('save', function () {
    logging.info('MongoDB', 'Checkout the book we just saved: ', this);
});

const bookModel = mongoose.model('Book', BookSchema);

export default bookModel;
