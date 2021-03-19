import MongoClient from 'mongodb';

import config from '../configs/config';

const db = async (): Promise<MongoClient.MongoClient> => {
    const client = await MongoClient.connect(config.mongo.url, config.mongo.options);

    return client;
};

export default db;
