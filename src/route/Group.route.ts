import express from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import GroupController from '../controller/Group.controller';

const router = express.Router();

router.route('/')
    .get(GroupController.getAll)
    .post(AuthVerify, GroupController.createGroup);
router.route('/:id')
    .get(GroupController.getGroupByID);

export default router;