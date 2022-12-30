import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import CustomRequest from '../type/CustomRequest';
import ProjectTypeRepository from '../repository/ProjectType.repository';
import ProjectType from '../model/ProjectType.model';
import { abs } from 'mathjs';

export default class ProjectTypeController {
	public static async getProjectTypeByID(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { id }  = req.params;
            if(!id) return res.json({
                code: 400,
                success: false,
                message: 'PROJECT_TYPE.GET.FAIL'
            });
            const projectType = await ProjectTypeRepository.getProjectByID(id);
            res.json(projectType);
        } catch(error) {
            console.error(error);
        }
    }

	public static async createProjectType(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            if(!req.userID || !req.username) return res.json({
                code: 400,
                success: false,
                message: 'PROJECT_TYPE.CREATE.FAIL'
            });
            
			const projectTypeProperties = { ...req.body };
            const _id = uuidv4();
            const projectType : ProjectType = new ProjectType({ _id , ...projectTypeProperties});

            if(!projectType) return res.json({
                code: 400,
                success: false,
                message: 'PROJECT_TYPE.CREATE.FAIL'
            });
            const newProjectType = await ProjectTypeRepository.createProjectType(req.userID, projectType);

            return res.json(newProjectType);
        } catch(error) {
            console.error(error);
        }
    }

	public static async updateProjectType(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const projectTypeUpdateInput = { ...req.body };
			const { id } = req.params;
            const result = await ProjectTypeRepository.updateProjectType(id, projectTypeUpdateInput);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

    public static async softDeleteProjectType(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
			const { id } = req.params;
            const userId = req.userID ? req.userID : 'temporary custom id user';
            const result = await ProjectTypeRepository.softDeleteProject(id, userId);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

    public static async restoreProjectType(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
			const { id } = req.params;
            // const userId = req.userID ? req.userID : 'temporary custom id user';
            const result = await ProjectTypeRepository.restoreProjectType(id);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

    public static async forceDeleteProjectType(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
			const { id } = req.params;
            const result = await ProjectTypeRepository.forceDeleteProjectType(id);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

	public static async getAll(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { limit , page } = req.query;
            const result = await ProjectTypeRepository.getAll(abs(parseInt(page as string)), abs(parseInt(limit as string)));
            return res.json(result);
            
        } catch(error) {
            console.log(error);
        }
    }

}
