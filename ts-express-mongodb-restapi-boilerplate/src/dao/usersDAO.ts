import { Collection, MongoClient } from 'mongodb';

import logger from '../utils/logger';
import config from '../configs/config';
import IUser from '../interfaces/user';

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
    public static async createUser(
        userInfo: IUser
    ): Promise<{
        success: boolean;
        data: any;
        statusCode: number;
    }> {
        try {
            const result = await UsersDAO.users.insertOne(userInfo);
            if (result.insertedCount === 1) {
                const data = result.ops[0];
                return {
                    success: true,
                    data: data,
                    statusCode: 201
                };
            }
            return {
                success: false,
                data: { error: 'User is not created' },
                statusCode: 422
            };
        } catch (e) {
            if (String(e).startsWith('MongoError: Document failed validation')) {
                return {
                    success: false,
                    data: { error: 'Document failed validation' },
                    statusCode: 422
                };
            }
            logger.error(`Error occurred while adding new user, ${e}.`);
            throw e;
        }
    }
    public static async getUserByEmail(email: string): Promise<any> {
        return await UsersDAO.users.findOne({
            email: email
        });
    }
}

export default UsersDAO;
