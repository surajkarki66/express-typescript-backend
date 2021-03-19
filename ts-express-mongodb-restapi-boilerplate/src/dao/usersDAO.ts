import { Collection, MongoClient } from 'mongodb';

import logger from '../utils/logger';
import config from '../configs/config';

class UsersDAO {
    private static users: Collection<any>;
    public static async injectDB(conn: MongoClient): Promise<void> {
        if (UsersDAO.users) {
            return;
        }
        try {
            UsersDAO.users = await conn.db(config.db).collection('users');
            logger.info(`Connected to users collection of ${config.db} database.`, 'UsersDAO.injectDB()');
        } catch (e) {
            logger.error(`Error while injecting DB: ${e.message}`, 'UsersDAO.injectDB()');
            throw e;
        }
    }
}

export default UsersDAO;
