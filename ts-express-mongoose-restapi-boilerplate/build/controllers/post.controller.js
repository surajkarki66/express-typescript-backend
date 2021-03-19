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
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
const response_1 = __importDefault(require("../helpers/response"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(ApiError_1.default.badRequest(msg[0]));
            return;
        }
        const data = req.body;
        const post = new post_1.default(data);
        const result = yield post.save();
        if (result) {
            const serverResponse = {
                result: result,
                statusCode: 201,
                contentType: 'application/json'
            };
            response_1.default(res, serverResponse);
        }
    }
    catch (error) {
        next(ApiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const posts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.getAllPosts();
        const serverResponse = {
            result: posts,
            statusCode: 201,
            contentType: 'application/json'
        };
        response_1.default(res, serverResponse);
    }
    catch (error) {
        next(ApiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
exports.default = { createPost, posts };
//# sourceMappingURL=post.controller.js.map