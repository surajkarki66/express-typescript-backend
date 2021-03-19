"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateUser = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                express_validator_1.body('firstName', 'First Name is required')
                    .notEmpty()
                    .isLength({
                    min: 4,
                    max: 32
                })
                    .withMessage('First Name must be between 3 to 32 characters'),
                express_validator_1.body('lastName', 'Last Name is required')
                    .notEmpty()
                    .isLength({
                    min: 4,
                    max: 32
                })
                    .withMessage('Last Name must be between 3 to 32 characters'),
                express_validator_1.body('email', 'Email is required').isEmail().notEmpty().normalizeEmail().withMessage('Must be a valid email address'),
                express_validator_1.body('gender', 'Gender must be required.').isString().notEmpty().isIn(['male', 'female', 'undisclosed']).withMessage('Gender must be male, female and undisclosed only.'),
                express_validator_1.body('address').optional().isObject().withMessage('address must be an object'),
                express_validator_1.body('address.city')
                    .optional()
                    .isString()
                    .withMessage('city must be a string')
                    .isLength({
                    min: 4,
                    max: 32
                })
                    .withMessage('city must be between 4 to 32 characters'),
                express_validator_1.body('address.street')
                    .optional()
                    .isString()
                    .withMessage('street must be a string.')
                    .isLength({
                    min: 4,
                    max: 32
                })
                    .withMessage('street must be between 4 to 32 characters'),
                express_validator_1.body('address.postCode').optional().isString().withMessage('postCode must be a string.'),
                express_validator_1.body('preferences').optional().isArray().withMessage('preferences must be an array'),
                express_validator_1.body('preferences.*').optional().isString().withMessage('array values must be a string')
            ];
        }
        case 'searchUser': {
            return [
                express_validator_1.body('firstName', 'First Name is required')
                    .exists()
                    .isLength({
                    min: 4,
                    max: 32
                })
                    .withMessage('First Name must be between 3 to 32 characters')
            ];
        }
        default:
            return [];
    }
};
exports.default = validateUser;
//# sourceMappingURL=userValidation.js.map