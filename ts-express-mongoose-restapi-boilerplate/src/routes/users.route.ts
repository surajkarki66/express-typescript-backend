import { Router } from 'express';

import UserController from '../controllers/user.controller';
import validateUser from '../middlewares/userValidation';

const router = Router();

router.post('/create', validateUser('createUser'), UserController.createUser);
router.route('/').get(UserController.users);
router.get('/search', validateUser('searchUser'), UserController.searchUsers);

export default router;
