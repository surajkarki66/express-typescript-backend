import { Router } from 'express';

import UserController from '../controllers/user.controller';

const router = Router();

router.route('/create').post(UserController.createUser);
router.route('/').get(UserController.users);
router.route('/search').get(UserController.searchUsers);

export default router;
