import { body } from 'express-validator';

const validateUser = (method: string) => {
    switch (method) {
        case 'createUser': {
            return [
                body('firstName', 'First Name is required')
                    .notEmpty()
                    .isLength({
                        min: 4,
                        max: 32
                    })
                    .withMessage('First Name must be between 3 to 32 characters'),
                body('lastName', 'Last Name is required')
                    .notEmpty()
                    .isLength({
                        min: 4,
                        max: 32
                    })
                    .withMessage('Last Name must be between 3 to 32 characters'),
                body('email', 'Email is required').isEmail().notEmpty().normalizeEmail().withMessage('Must be a valid email address'),
                body('gender', 'Gender must be required.').isString().notEmpty().isIn(['male', 'female', 'undisclosed']).withMessage('Gender must be male, female and undisclosed only.'),
                body('address').optional().isObject().withMessage('address must be an object'),
                body('address.city')
                    .optional()
                    .isString()
                    .withMessage('city must be a string')
                    .isLength({
                        min: 4,
                        max: 32
                    })
                    .withMessage('city must be between 4 to 32 characters'),
                body('address.street')
                    .optional()
                    .isString()
                    .withMessage('street must be a string.')
                    .isLength({
                        min: 4,
                        max: 32
                    })
                    .withMessage('street must be between 4 to 32 characters'),
                body('address.postCode').optional().isString().withMessage('postCode must be a string.'),
                body('preferences').optional().isArray().withMessage('preferences must be an array'),
                body('preferences.*').optional().isString().withMessage('array values must be a string')
            ];
        }
        case 'searchUser': {
            return [
                body('firstName', 'First Name is required')
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

export default validateUser;
