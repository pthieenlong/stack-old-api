import express from 'express';
import AuthController from '../controller/Auth.controller';

const router = express.Router();
router.route('/register')
    .post(AuthController.register);
router.route('/login')
    .post(AuthController.login);

export default router;