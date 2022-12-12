import express from 'express';
import AuthRoute from './Auth.route';


const mainRouter = express.Router();

mainRouter.use('/auth', AuthRoute);

export default mainRouter;