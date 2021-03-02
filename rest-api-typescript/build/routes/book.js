"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var book_1 = __importDefault(require("../controllers/book"));
var router = express_1.default.Router();
router.post('/create/book', book_1.default.createBook);
router.get('/get/books', book_1.default.getAllBooks);
exports.default = router;
