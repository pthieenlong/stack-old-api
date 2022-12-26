import express from 'express';
import AuthRoute from './Auth.route';
import UserRoute from './User.route';
import ProjectRouter from './Project.route';
import ProjectTypeRouter from './ProjectType.route'; 
import GroupRouter from './Group.route';
import OrderRouter from './Order.route';
import OrderDetailRouter from './OrderDetail.route';


const mainRouter = express.Router();

mainRouter.use('/auth', AuthRoute);
mainRouter.use('/user', UserRoute);
mainRouter.use('/projects', ProjectRouter);
mainRouter.use('/project-type', ProjectTypeRouter);
mainRouter.use('/groups', GroupRouter);
mainRouter.use('/order', OrderRouter);
mainRouter.use('/order-detail', OrderDetailRouter);

export default mainRouter;