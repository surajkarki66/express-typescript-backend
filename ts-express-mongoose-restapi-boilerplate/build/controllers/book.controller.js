"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const book_1 = __importDefault(require("../models/book"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const response_1 = __importDefault(require("../helpers/response"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, title } = req.body;
        const book = new book_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            author,
            title
        });
        const result = yield book.save();
        const serverResponse = { result: result, statusCode: 201, contentType: 'application/json' };
        return response_1.default(res, serverResponse);
    }
    catch (err) {
        next(ApiError_1.default.internal(`Something went wrong: ${err.message}`));
        return;
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find({});
        if (books) {
            const serverResponse = { result: books, statusCode: 200, contentType: 'application/json' };
            return response_1.default(res, serverResponse);
        }
    }
    catch (error) {
        next(ApiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
exports.default = { createBook, getAllBooks };
//# sourceMappingURL=book.controller.js.map