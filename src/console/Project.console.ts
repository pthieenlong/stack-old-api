import path from 'path';
import fs from 'fs';
import Database from '../database/Database';
import ProjectSchema from '../database/schema/Project.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export default class ProjectConsole {
    public static async create(): Promise<boolean> {    
        try {
            Database.connect();
            const filePath = path.join(__dirname, '../', 'database', 'json', 'projects.json');
            const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const projectData = JSON.parse(fileContent);
            await ProjectSchema.db?.dropCollection('projects');
            const result = await ProjectSchema.insertMany(projectData);
            return result ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }     
    }
}