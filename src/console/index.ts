import { exit } from 'process';
import UserConsole from '../console/User.console';
import NotificationConsole from './Notification.console';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const createUserCollection = async ():Promise<void> => {
    try {
        await Promise.all([
            UserConsole.create(),
            NotificationConsole.create()
        ])
        .finally(() => {
            console.log('users, notifications collection successfully created');
        });
        exit();
    } catch (error) {
        console.log(error);
    }
};

createUserCollection();