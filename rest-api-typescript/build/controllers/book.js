"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var book_1 = __importDefault(require("../models/book"));
var createBook = function (req, res, next) {
    var _a = req.body, author = _a.author, title = _a.title;
    var book = new book_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author: author,
        title: title
    });
    return book
        .save()
        .then(function (result) {
        return res.status(201).json({
            book: result
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
var getAllBooks = function (req, res, next) {
    book_1.default.find()
        .exec()
        .then(function (books) {
        return res.status(200).json({
            books: books,
            count: books.length
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
exports.default = { createBook: createBook, getAllBooks: getAllBooks };
