import express from 'express';
import AuthRoute from './Auth.route';
import UserRoute from './User.route';

const mainRouter = express.Router();

mainRouter.use('/auth', AuthRoute);
mainRouter.use('/user', UserRoute);
export default mainRouter;