import App from './app';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';

import config from './config/config';
import apiRules from './middlewares/apiRules';
import connectDB from './config/db';

let middlewares = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    apiRules,
    cookieParser(),
    mongoSanitize(),
    helmet(),
    hpp(),
    compression({
        level: 6,
        threshold: 100 * 100,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression.filter(req, res);
        }
    })
];

if (config.env === 'development') {
    middlewares = [
        ...middlewares,
        morgan('dev'),
        cors({
            origin: config.url
        })
    ];
}

const app = new App({
    port: Number(config.server.port),
    host: config.server.hostname,
    middleWares: middlewares
});

connectDB();
app.listen();
