import path from 'path';
import express from 'express';
import { Application } from 'express';

import logging from './config/logging';
import userRoutes from './routes/users.route';
import postRoutes from './routes/posts.route';
import apiErrorHandler from './errors/apiErrorHandler';

class App {
    private app: Application;
    private host: string;
    private port: number;

    constructor(appInit: { port: number; host: string; middleWares: any }) {
        this.app = express();
        this.port = appInit.port;
        this.host = appInit.host;

        this.middlewares(appInit.middleWares);
        this.routes();
    }
    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }
    private routes() {
        // Static routes
        this.app.use('/uploads', express.static(path.join(__dirname + '/../public/uploads')));

        // Normal Routes
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/posts', postRoutes);

        // Error Handler Route
        this.app.use(apiErrorHandler);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logging.info('Server', `Server is running in ${this.host}:${this.port}`);
        });
    }
}

export default App;
