"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writeServerResponse = (res, data) => {
    const { result, statusCode, contentType } = data;
    res.setHeader('Content-Type', contentType);
    return res.status(statusCode).json(result);
};
exports.default = writeServerResponse;
//# sourceMappingURL=response.js.map