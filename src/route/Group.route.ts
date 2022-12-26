import { Router } from 'express';

import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import GroupController from '../controller/Group.controller';

const router : Router = Router();

router.route('/')
        .get(GroupController.getAll)
        .post(AuthVerify, UserVerify, GroupController.create);

router.route('/:id')
        .get(GroupController.getOne)
        .put(AuthVerify, UserVerify, GroupController.update)
        .delete(AuthVerify, UserVerify, GroupController.softDelete);

router.put('/restore/:id',AuthVerify, UserVerify, GroupController.restore);
router.delete('/force/:id', AuthVerify, UserVerify, GroupController.forceDelete);

export default router;