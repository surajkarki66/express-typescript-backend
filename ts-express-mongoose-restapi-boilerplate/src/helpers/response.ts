import { Response } from 'express';

interface Idata {
    result: any;
    statusCode: number;
    contentType: string;
}
const writeServerResponse = (res: Response, data: Idata) => {
    const { result, statusCode, contentType } = data;
    res.setHeader('Content-Type', contentType);
    return res.status(statusCode).json(result);
};

export default writeServerResponse;
