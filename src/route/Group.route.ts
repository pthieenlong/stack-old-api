import express from 'express';
import GroupController from '../controller/Group.controller';
import AuthVerify from '../middleware/AuthVerify.middleware';

const router = express.Router();

router.route('/')
    .post(AuthVerify, GroupController.createGroup);
router.route('/:id')
    .get(GroupController.getGroupByID);

export default router;