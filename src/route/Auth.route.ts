import express from 'express';
import AuthController from '../controller/Auth.controller';

const router = express.Router();
router.route('/register')
    .post(AuthController.register);


export default router;