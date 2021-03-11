import { Router } from 'express';

import UserController from '../controllers/user.controller';

const router = Router();

router.route('/create').post(UserController.createUser);

export default router;
