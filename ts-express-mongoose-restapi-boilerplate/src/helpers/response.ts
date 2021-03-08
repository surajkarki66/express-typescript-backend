import { Response } from 'express';

const writeServerResponse = (res: Response, data: any) => {
    const { result, statusCode, contentType } = data;
    res.setHeader('Content-Type', contentType);
    return res.status(statusCode).json(result);
};

export default writeServerResponse;
