import { Router } from 'express';

import BookController from '../controllers/book.controller';

const router = Router();

router.route('/create').post(BookController.createBook);
router.route('/').get(BookController.getAllBooks);

export default router;
