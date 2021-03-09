"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const config_1 = __importDefault(require("./config/config"));
const apiRules_1 = __importDefault(require("./middlewares/apiRules"));
const db_1 = __importDefault(require("./config/db"));
let middlewares = [
    body_parser_1.default.json(),
    body_parser_1.default.urlencoded({ extended: true }),
    apiRules_1.default,
    cookie_parser_1.default(),
    express_mongo_sanitize_1.default(),
    helmet_1.default(),
    hpp_1.default(),
    compression_1.default({
        level: 6,
        threshold: 100 * 100,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression_1.default.filter(req, res);
        }
    })
];
if (config_1.default.env === 'development') {
    middlewares = [
        ...middlewares,
        morgan_1.default('dev'),
        cors_1.default({
            origin: config_1.default.url
        })
    ];
}
const app = new app_1.default({
    port: Number(config_1.default.server.port),
    host: config_1.default.server.hostname,
    middleWares: middlewares
});
db_1.default();
app.listen();
//# sourceMappingURL=server.js.map