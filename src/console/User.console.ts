import path from 'path';
import fs from 'fs';
import Database from '../database/Database';
import UserSchema from '../database/schema/User.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export default class UserConsole {
    public static async create(): Promise<boolean> {    
        try {
            Database.connect();
            const filePath = path.join(__dirname, '../', 'database', 'json', 'users.json');
            const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const userData = JSON.parse(fileContent);
            await UserSchema.db?.dropCollection('users');
            const result = await UserSchema.insertMany(userData);
            return result ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }     
    }
}