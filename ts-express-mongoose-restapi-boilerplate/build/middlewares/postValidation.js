"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validatePost = (method) => {
    switch (method) {
        case 'createPost': {
            return [
                express_validator_1.body('title', 'Title is required')
                    .notEmpty()
                    .isLength({
                    min: 4,
                    max: 32
                })
                    .withMessage('Title must be between 4 to 32 characters'),
                express_validator_1.body('postedBy', 'PostedBy is required').notEmpty().isMongoId().withMessage('PostedBy must be a mongodb objectId'),
                express_validator_1.body('comments').optional().isArray().withMessage('Comments must be an array'),
                express_validator_1.body('comments.*.text', 'Text is required').exists().isString().withMessage('Text must be string'),
                express_validator_1.body('comments.*.postedBy', 'PostedBy is required').exists().isMongoId().withMessage('PostedBy must be mongodb objectId')
            ];
        }
        default:
            return [];
    }
};
exports.default = validatePost;
//# sourceMappingURL=postValidation.js.map