import express from 'express';
import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import ProjectRouter from './Project.route';
import ProjectTypeRouter from './ProjectType.route'; 
import GroupRouter from './Group.route';

const mainRouter = express.Router();

mainRouter.use('/auth', AuthRoute);
mainRouter.use('/user', UserRoute);
mainRouter.use('/project', ProjectRouter);
mainRouter.use('/project-type', ProjectTypeRouter);
mainRouter.use('/group', GroupRouter);


export default mainRouter;