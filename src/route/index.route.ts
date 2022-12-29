import express from 'express';
import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import GroupRoute from './Group.route';
const mainRouter = express.Router();

mainRouter.use('/auth', AuthRoute);
mainRouter.use('/user', UserRoute);
mainRouter.use('/group', GroupRoute);
export default mainRouter;