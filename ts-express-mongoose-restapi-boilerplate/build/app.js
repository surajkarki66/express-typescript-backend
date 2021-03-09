"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./config/logging"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const apiErrorHandler_1 = __importDefault(require("./errors/apiErrorHandler"));
class App {
    constructor(appInit) {
        this.app = express_1.default();
        this.port = appInit.port;
        this.host = appInit.host;
        this.middlewares(appInit.middleWares);
        this.routes();
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }
    routes() {
        // Static routes
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname + '/../public/uploads')));
        // Normal Routes
        this.app.use('/api/books', book_route_1.default);
        // Error Handler Route
        this.app.use(apiErrorHandler_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            logging_1.default.info('Server', `Server is running in ${this.host}:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map