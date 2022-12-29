import express, { Router } from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import ProjectController from '../controller/Project.controller';

const router : Router = express.Router();

router.route('/')
    .get(ProjectController.getAll)
    .post(AuthVerify, ProjectController.createProject);

router.route('/:id')
    .get(ProjectController.getProjectByID)
    .put(AuthVerify, ProjectController.updateProject)
    .delete(AuthVerify, ProjectController.softDeleteProject);

router.put('/restore/:id',AuthVerify, ProjectController.restoreProject);
router.delete('/force/:id', AuthVerify, ProjectController.forceDeleteProject);

export default router;