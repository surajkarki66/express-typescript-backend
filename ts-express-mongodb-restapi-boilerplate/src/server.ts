import express from 'express';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';

import App from './app';
import config from './configs/config';
import db from './utils/db';
import httpLogger from './utils/httpLogger';
import logger from './utils/logger';
import UsersDAO from './dao/usersDAO';

let middlewares = [
    express.json(),
    express.urlencoded({ extended: true }),
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
    }),
    httpLogger
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

app.listen();
db()
    .then((client) => {
        UsersDAO.injectDB(client);
        logger.info('Database connected successfully.');
    })
    .catch((err) => {
        logger.error(`Error connecting to the MongoDB URI: ${err.stack}`);
        process.exit(1);
    });
