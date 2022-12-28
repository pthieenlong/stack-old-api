import { exit } from 'process';
import UserConsole from '../console/User.console';
import ProjectConsole from '../console/Project.console';
import ProjectTypeConsole from '../console/ProjectType.console';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const createUserCollection = async ():Promise<void> => {
    if(await UserConsole.create())
        console.log('create user collection success');
    exit();
};
const createProjectTypeCollection = async ():Promise<void> => {
    if(await ProjectTypeConsole.create())
        console.log('create project type collection success');
    exit();
};
const createProjectCollection = async ():Promise<void> => {
    if(await ProjectConsole.create())
        console.log('create project collection success');
    exit();
};
createUserCollection();
createProjectCollection();
createProjectTypeCollection();