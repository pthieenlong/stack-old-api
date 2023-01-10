import express from 'express';
import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import GroupRoute from './Group.route';
import NotifyRoute from './Notification.route';
const mainRouter = express.Router();

mainRouter.use('/auth', AuthRoute);
mainRouter.use('/user', UserRoute);
mainRouter.use('/group', GroupRoute);
mainRouter.use('/notification', NotifyRoute);
export default mainRouter;