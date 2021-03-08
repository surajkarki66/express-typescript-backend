import { Request, Response, NextFunction } from 'express';

import ApiError from './ApiError';
import writeServerResponse from '../helpers/response';

const apiErrorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let serverResponse = {
        result: {
            status: 'failed',
            data: { error: err.message }
        },
        statusCode: err.code,
        contentType: 'application/json'
    };
    if (err instanceof ApiError) {
        return writeServerResponse(res, serverResponse);
    }
    serverResponse = {
        ...serverResponse,
        statusCode: 500
    };
    return writeServerResponse(res, serverResponse);
};

export default apiErrorHandler;
