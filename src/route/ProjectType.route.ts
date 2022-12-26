import express, { Router } from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import ProjectTypeController from '../controller/ProjectType.controller';

const router : Router = express.Router();

router.route('/')
    .get(ProjectTypeController.getAll)
    .post(ProjectTypeController.create);

router.route('/:id')
    .get(ProjectTypeController.getOne)
    .put(AuthVerify, UserVerify, ProjectTypeController.update)
    .delete(ProjectTypeController.softDelete);

router.put('/restore/:id',AuthVerify, UserVerify, ProjectTypeController.restore);
router.delete('/force/:id', AuthVerify, UserVerify, ProjectTypeController.forceDelete);

export default router;