"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const router = express_1.Router();
router.route('/create').post(book_controller_1.default.createBook);
router.route('/').get(book_controller_1.default.getAllBooks);
exports.default = router;
//# sourceMappingURL=book.route.js.map