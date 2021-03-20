import { Request, Response, NextFunction } from 'express';

import ApiError from '../errors/ApiError';
import IUser from '../interfaces/user';
import UsersDAO from '../dao/usersDAO';
import writeServerResponse from '../helpers/response';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
        const userInfo: IUser = req.body;
        const { email } = userInfo;
        const user = await UsersDAO.getUserByEmail(email);
        if (user) {
            next(ApiError.conflict('Email is already taken'));
            return;
        }
        const { success, data, statusCode } = await UsersDAO.createUser(userInfo);
        if (success) {
            const responseData = { status: 'success', data: data };
            const serverResponse = {
                result: responseData,
                statusCode: statusCode,
                contentType: 'application/json'
            };
            return writeServerResponse(res, serverResponse);
        }
        next(ApiError.badRequest(data.error));
        return;
    } catch (error) {
        next(ApiError.internal(`Something went wrong: ${error.message}`));
        return;
    }
};

export default { createUser };
