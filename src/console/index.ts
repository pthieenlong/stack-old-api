import { exit } from 'process';
import UserConsole from '../console/User.console';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const createUserCollection = async ():Promise<void> => {
    if(await UserConsole.create())
        console.log('create user collection success');
    exit();
};

createUserCollection();