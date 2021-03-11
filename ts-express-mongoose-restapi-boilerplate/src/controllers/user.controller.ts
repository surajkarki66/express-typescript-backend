import { Request, Response, NextFunction } from 'express';

import { IUserDocument } from '../interfaces/user';
import User from '../models/user';
import writeServerResponse from '../helpers/response';
import ApiError from '../errors/ApiError';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, firstName, lastName, gender, address, preferences }: IUserDocument = req.body;
        const user = new User({ email, firstName, lastName, gender, address, preferences });
        const isEmail = await User.findByEmail(email);
        if (isEmail) {
            next(ApiError.badRequest('Email already taken.'));
            return;
        }
        const result = await user.save();
        if (result) {
            const serverResponse = {
                result: result,
                statusCode: 201,
                contentType: 'application/json'
            };
            writeServerResponse(res, serverResponse);
        }
    } catch (error) {
        next(ApiError.internal(`Something went wrong: ${error.message}`));
        return;
    }
};

export default { createUser };
