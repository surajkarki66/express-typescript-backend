import App from './app';
import bodyParser from 'body-parser';

import config from './config/config';

const app = new App({
    port: Number(config.server.port),
    host: config.server.hostname,
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
    controllers: []
});

app.listen();
