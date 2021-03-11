import { Response } from 'express';

interface Idata {
    result: object;
    statusCode: number;
    contentType: string;
}
const writeServerResponse = (res: Response, data: Idata) => {
    const { result, statusCode, contentType } = data;
    res.setHeader('Content-Type', contentType);
    return res.status(statusCode).json(result);
};

export default writeServerResponse;
