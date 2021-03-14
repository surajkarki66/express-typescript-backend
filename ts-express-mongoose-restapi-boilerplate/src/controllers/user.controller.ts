import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { IUserDocument } from '../interfaces/user';
import User from '../models/user';
import writeServerResponse from '../helpers/response';
import ApiError from '../errors/ApiError';
import errorFormatter from '../helpers/errorFormatter';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(ApiError.badRequest(msg[0]));
            return;
        }

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

const users = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.getAllUsers();
        const serverResponse = {
            result: users,
            statusCode: 201,
            contentType: 'application/json'
        };
        writeServerResponse(res, serverResponse);
    } catch (error) {
        next(ApiError.internal(`Something went wrong: ${error.message}`));
        return;
    }
};

const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(ApiError.badRequest(msg[0]));
            return;
        }

        const { firstName }: any = req.query;

        const users = await User.findByFirstName(firstName);

        const serverResponse = {
            result: users,
            statusCode: 201,
            contentType: 'application/json'
        };
        writeServerResponse(res, serverResponse);
    } catch (error) {
        next(ApiError.internal(`Something went wrong: ${error.message}`));
        return;
    }
};
export default { createUser, users, searchUsers };
