import { Router } from 'express';

import PostController from '../controllers/post.controller';
import validatePost from '../middlewares/postValidation';

const router = Router();

router.post('/create', validatePost('createPost'), PostController.createPost);
router.route('/').get(PostController.posts);

export default router;
