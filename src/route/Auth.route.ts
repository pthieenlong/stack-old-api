import express from 'express';
import AuthVerify from 'middleware/AuthVerify.middleware';
import AuthController from '../controller/Auth.controller';
import AuthRepository from 'repository/Auth.repository';

const router = express.Router();
router.route('/register')
    .post(AuthController.register);
router.route('/login')
    .post(AuthController.login);
// router.route('/verify')
//     .post(AuthVerify, AuthRepository)
export default router;