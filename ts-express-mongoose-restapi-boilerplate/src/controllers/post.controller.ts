import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import { IPostDocument } from '../interfaces/post';
import Post from '../models/post';
import writeServerResponse from '../helpers/response';
import ApiError from '../errors/ApiError';
import errorFormatter from '../helpers/errorFormatter';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(ApiError.badRequest(msg[0]));
            return;
        }
        const data: IPostDocument = req.body;

        const post = new Post(data);
        const result = await post.save();
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

const posts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.getAllPosts();
        const serverResponse = {
            result: posts,
            statusCode: 201,
            contentType: 'application/json'
        };
        writeServerResponse(res, serverResponse);
    } catch (error) {
        next(ApiError.internal(`Something went wrong: ${error.message}`));
        return;
    }
};

export default { createPost, posts };
