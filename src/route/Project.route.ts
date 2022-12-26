import express, { Router } from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import ProjectController from '../controller/Project.controller';

const router : Router = express.Router();

router.route('/')
    .get(ProjectController.getAll)
    .post(AuthVerify, UserVerify, ProjectController.create);

router.route('/:id')
    .get(ProjectController.getOne)
    .put(AuthVerify, UserVerify, ProjectController.update)
    .delete(AuthVerify, UserVerify, ProjectController.softDelete);

router.put('/restore/:id',AuthVerify, UserVerify, ProjectController.restore);
router.delete('/force/:id', AuthVerify, UserVerify, ProjectController.forceDelete);

export default router;