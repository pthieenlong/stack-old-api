import express from 'express';
import { GroupRole } from '../type/enum/EUser';
import GroupController from '../controller/Group.controller';
import AuthVerify from '../middleware/AuthVerify.middleware';
import { groupRolesVerify as GroupRolesVerify } from '../middleware/GroupRolesVerify.middleware';
const router = express.Router();

router.route('/')
    .get(GroupController.getAll)
    .post(AuthVerify, GroupController.createGroup);
router.route('/:id')
    .get(GroupController.getGroupByID)
    .put(AuthVerify, GroupRolesVerify([GroupRole.OWNER, GroupRole.LEADER]), GroupController.updateGroupInfomations);
router.route('/:id/member')
    .put(AuthVerify, GroupRolesVerify([GroupRole.OWNER, GroupRole.LEADER]), GroupController.addMember);
export default router;