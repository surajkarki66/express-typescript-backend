class ApiError {
    public code: number;
    public message: string;
    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
    public static badRequest(msg: string) {
        return new ApiError(400, msg);
    }
    public static internal(msg: string) {
        return new ApiError(500, msg);
    }
    public static conflict(msg: string) {
        return new ApiError(409, msg);
    }
    public static unauthorized(msg: string) {
        return new ApiError(401, msg);
    }
    public static forbidden(msg: string) {
        return new ApiError(403, msg);
    }
    public static unprocessable(msg: string) {
        return new ApiError(422, msg);
    }
    public static notfound(msg: string) {
        return new ApiError(404, msg);
    }
}

export default ApiError;
