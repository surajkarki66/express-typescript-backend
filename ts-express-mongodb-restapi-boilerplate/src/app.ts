import express from 'express';
import { Application } from 'express';

import logging from './config/logging';

class App {
    private app: Application;
    private host: string;
    private port: number;

    constructor(appInit: { port: number; host: string; middleWares: any; controllers: any }) {
        this.app = express();
        this.port = appInit.port;
        this.host = appInit.host;

        this.middlewares(appInit.middleWares);
    }
    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            logging.info('Server', `Server is running in ${this.host}:${this.port}`);
        });
    }
}

export default App;
