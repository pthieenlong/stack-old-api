import { exit } from 'process';
import UserConsole from '../console/User.console';
import ProjectConsole from '../console/Project.console';
import ProjectTypeConsole from '../console/ProjectType.console';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const createCollections = async function(): Promise<void> {
    try {
        const promises = Promise.all([
            UserConsole.create(),
            ProjectConsole.create(),
            ProjectTypeConsole.create()
        ]);
        const result = (await promises).every(val => val === true);
        if(result)
            console.log('create collections success');
        else console.log('create collections fail');
        
        exit();
    } catch(error) {
        console.error(error);
    }
};
createCollections();