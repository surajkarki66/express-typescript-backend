import { Collection, MongoClient } from 'mongodb';

import logger from '../utils/logger';
import config from '../configs/config';
import IUser from '../interfaces/user';

class UsersDAO {
    private static users: Collection<any>;
    private static DEFAULT_SORT = { username: -1 };

    public static async injectDB(conn: MongoClient): Promise<void> {
        if (UsersDAO.users) {
            return;
        }
        try {
            UsersDAO.users = conn.db(config.db).collection('users');
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
    public static async getUsers({ page = 0, usersPerPage = 10, filter = {} } = {}): Promise<{
        success: boolean;
        data: any[];
        totalNumUsers: number;
        statusCode: number;
    }> {
        const sort = UsersDAO.DEFAULT_SORT;
        const projection = { password: 0 };
        let cursor;
        try {
            cursor = UsersDAO.users.find(filter).project(projection).sort(sort);
        } catch (e) {
            logger.error(`Unable to issue find command, ${e.message}`);
            return {
                success: false,
                data: [],
                totalNumUsers: 0,
                statusCode: 404
            };
        }
        const displayCursor = cursor.skip(page * usersPerPage).limit(usersPerPage);
        try {
            const documents = await displayCursor.toArray();
            const totalNumUsers = page === 0 ? await UsersDAO.users.countDocuments({}) : 0;
            return {
                success: true,
                data: documents,
                totalNumUsers,
                statusCode: documents.length > 0 ? 200 : 404
            };
        } catch (e) {
            logger.error(`Unable to convert cursor to array or problem counting documents, ${e.message}`);
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
