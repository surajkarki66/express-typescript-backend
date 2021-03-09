"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("./ApiError"));
const response_1 = __importDefault(require("../helpers/response"));
const apiErrorHandler = (err, req, res, next) => {
    let serverResponse = {
        result: {
            status: 'failed',
            data: { error: err.message }
        },
        statusCode: err.code,
        contentType: 'application/json'
    };
    if (err instanceof ApiError_1.default) {
        return response_1.default(res, serverResponse);
    }
    serverResponse = Object.assign(Object.assign({}, serverResponse), { statusCode: 500 });
    return response_1.default(res, serverResponse);
};
exports.default = apiErrorHandler;
//# sourceMappingURL=apiErrorHandler.js.map