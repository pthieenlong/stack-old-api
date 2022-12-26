import express from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import UserController from '../controller/User.controller';
const router = express.Router();
router.route('/:id')
    .get(AuthVerify, UserVerify, UserController.getByID);

export default router;