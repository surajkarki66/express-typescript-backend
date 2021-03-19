import mongoose from 'mongoose';

import config from './config';
import logging from './logging';

const connectDB = async (): Promise<void> => {
    try {
        const result = await mongoose.connect(config.mongo.url, config.mongo.options);
        if (result) {
            logging.info('Server', `MongoDB Connected: ${result.connection.host}`);
        }
    } catch (error) {
        logging.error('Server', error.message, error);
    }
};
export default connectDB;
