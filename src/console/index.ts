import { exit } from 'process';
import UserConsole from '../console/User.console';
import ProjectConsole from '../console/Project.console';
import ProjectTypeConsole from '../console/ProjectType.console';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const createUserCollection = async ():Promise<void> => {
    try {
        Promise.all([
            UserConsole.create(),
            ProjectConsole.create(),
            ProjectTypeConsole.create()
        ])
        .then(() => {
            console.log('Created user, project, project type collection');
        });
        exit();
    } catch (error) {
        console.log(error);
    }
};

createUserCollection();