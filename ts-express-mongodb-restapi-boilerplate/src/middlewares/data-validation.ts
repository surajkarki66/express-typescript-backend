import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import ApiError from '../errors/ApiError';

const dataValidation = (schema: Joi.ObjectSchema<any>, property: string) => {
    return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        try {
            let value;
            switch (property) {
                case 'body':
                    value = await schema.validateAsync(req.body);
                    break;

                case 'params':
                    value = await schema.validateAsync(req.params);
                    break;

                case 'query':
                    value = await schema.validateAsync(req.query);
                    break;

                default:
                    value = await schema.validateAsync(req.header);
            }
            req.body = value;
            next();
        } catch (err) {
            const { details } = err;
            const message = details.map((i: any) => i.message).join(',');

            next(ApiError.badRequest(message));
            return;
        }
    };
};

export default dataValidation;
