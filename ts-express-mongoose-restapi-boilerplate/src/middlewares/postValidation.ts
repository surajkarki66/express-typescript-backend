import { body } from 'express-validator';

const validatePost = (method: string) => {
    switch (method) {
        case 'createPost': {
            return [
                body('title', 'Title is required')
                    .notEmpty()
                    .isLength({
                        min: 4,
                        max: 32
                    })
                    .withMessage('Title must be between 4 to 32 characters'),
                body('postedBy', 'PostedBy is required').notEmpty().isMongoId().withMessage('PostedBy must be a mongodb objectId'),
                body('comments').optional().isArray().withMessage('Comments must be an array'),
                body('comments.*.text', 'Text is required').exists().isString().withMessage('Text must be string'),
                body('comments.*.postedBy', 'PostedBy is required').exists().isMongoId().withMessage('PostedBy must be mongodb objectId')
            ];
        }

        default:
            return [];
    }
};

export default validatePost;
