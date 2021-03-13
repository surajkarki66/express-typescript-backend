import { Router } from 'express';

import PostController from '../controllers/post.controller';

const router = Router();

router.route('/create').post(PostController.createPost);
router.route('/').get(PostController.posts);

export default router;
