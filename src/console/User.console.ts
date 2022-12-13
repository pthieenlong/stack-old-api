import path from 'path';
import fs from 'fs';
export default class UserConsole {
    public static async create(): Promise<boolean> {    
        try {
            const filePath = path.join('../', __dirname, 'database', 'json', 'users.json');
            const file = fs.readFileSync(filePath, { encoding: 'utf-8' });
            console.log(file);
            

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }     
        
    }
}