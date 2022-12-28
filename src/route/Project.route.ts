import express, { Router } from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import ProjectController from '../controller/Project.controller';

const router : Router = express.Router();

router.route('/')
    .get(ProjectController.getAll)
    .post(AuthVerify, ProjectController.createProject);

router.route('/:id')
    .get(ProjectController.getProjectByID)
    .put(AuthVerify, UserVerify, ProjectController.updateProject)
    .delete(AuthVerify, UserVerify, ProjectController.softDeleteProject);

router.put('/restore/:id',AuthVerify, UserVerify, ProjectController.restoreProject);
router.delete('/force/:id', AuthVerify, UserVerify, ProjectController.forceDeleteProject);

export default router;