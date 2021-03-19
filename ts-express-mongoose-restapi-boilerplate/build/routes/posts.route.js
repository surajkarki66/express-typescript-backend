"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const postValidation_1 = __importDefault(require("../middlewares/postValidation"));
const router = express_1.Router();
router.post('/create', postValidation_1.default('createPost'), post_controller_1.default.createPost);
router.route('/').get(post_controller_1.default.posts);
exports.default = router;
//# sourceMappingURL=posts.route.js.map