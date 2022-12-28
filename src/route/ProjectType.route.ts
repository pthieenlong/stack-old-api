import express, { Router } from 'express';
import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import ProjectTypeController from '../controller/ProjectType.controller';

const router : Router = express.Router();

router.route('/')
    .get(ProjectTypeController.getAll)
    .post(AuthVerify, ProjectTypeController.createProjectType);

router.route('/:id')
    .get(ProjectTypeController.getProjectTypeByID)
    .put(AuthVerify, UserVerify, ProjectTypeController.updateProjectType)
    .delete(AuthVerify, UserVerify, ProjectTypeController.softDeleteProjectType);

router.put('/restore/:id',AuthVerify, UserVerify, ProjectTypeController.restoreProjectType);
router.delete('/force/:id', AuthVerify, UserVerify, ProjectTypeController.forceDeleteProjectType);

export default router;