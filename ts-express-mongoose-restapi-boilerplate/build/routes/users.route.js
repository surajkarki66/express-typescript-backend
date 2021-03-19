"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userValidation_1 = __importDefault(require("../middlewares/userValidation"));
const router = express_1.Router();
router.post('/create', userValidation_1.default('createUser'), user_controller_1.default.createUser);
router.route('/').get(user_controller_1.default.users);
router.get('/search', userValidation_1.default('searchUser'), user_controller_1.default.searchUsers);
exports.default = router;
//# sourceMappingURL=users.route.js.map