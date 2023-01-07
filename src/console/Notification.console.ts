import path from 'path';
import fs from 'fs';
import Database from '../database/Database';
import NotificationSchema from '../database/schema/Notification.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export default class NotificationConsole {
    public static async create(): Promise<boolean> {    
        try {
            Database.connect();
            const filePath = path.join(__dirname, '../', 'database', 'json', 'notifications.json');
            const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const notifyData = JSON.parse(fileContent);
            await NotificationSchema.db?.dropCollection('notifications');
            const result = await NotificationSchema.insertMany(notifyData);
            return result ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }     
    }
}