import express from 'express';
import UserVerify from '../middleware/UserVerify.middleware';
import UserController from '../controller/User.controller';
import AuthVerify from '../middleware/AuthVerify.middleware';
const router = express.Router();
router.route('/:id')
    .get(AuthVerify, UserVerify, UserController.getByID);
export default router;