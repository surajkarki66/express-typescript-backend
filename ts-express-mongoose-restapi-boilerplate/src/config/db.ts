import mongoose from 'mongoose';

import config from './config';
import logging from './logging';

const connectDB = async () => {
    try {
        const result = await mongoose.connect(config.mongo.url, config.mongo.options);
        if (result) {
            logging.info('Server', 'MongoDB Connected');
        }
    } catch (error) {
        logging.error('Server', error.message, error);
    }
};
export default connectDB;