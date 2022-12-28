import path from 'path';
import fs from 'fs';
import Database from '../database/Database';
import ProjectTypeSchema from '../database/schema/ProjectType.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export default class ProjectTypeConsole {
    public static async create(): Promise<boolean> {    
        try {
            Database.connect();
            const filePath = path.join(__dirname, '../', 'database', 'json', 'projecttypes.json');
            const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const projectTypeData = JSON.parse(fileContent);
            await ProjectTypeSchema.db?.dropCollection('project_types');
            const result = await ProjectTypeSchema.insertMany(projectTypeData);
            return result ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }     
    }
}