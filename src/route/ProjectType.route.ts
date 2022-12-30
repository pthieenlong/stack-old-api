import express, { Router } from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import ProjectTypeController from '../controller/ProjectType.controller';

const router : Router = express.Router();

router.route('/')
    .get(ProjectTypeController.getAll)
    .post(AuthVerify, ProjectTypeController.createProjectType);

router.route('/:id')
    .get(ProjectTypeController.getProjectTypeByID)
    .put(AuthVerify, ProjectTypeController.updateProjectType)
    .delete(AuthVerify, ProjectTypeController.softDeleteProjectType);

router.put('/restore/:id',AuthVerify, ProjectTypeController.restoreProjectType);
router.delete('/force/:id', AuthVerify, ProjectTypeController.forceDeleteProjectType);

export default router;