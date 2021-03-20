import { Router } from 'express';

import userController from '../controllers/user.controller';
import validateData from '../middlewares/data-validation';
import UserSchema from '../helpers/schema/userSchema';

const router = Router();

router.route('/signup').post(validateData(UserSchema.userSIGNUP, 'body')).post(userController.createUser);
export default router;
