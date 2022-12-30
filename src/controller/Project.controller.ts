import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { abs } from 'mathjs';

import CustomRequest from '../type/CustomRequest';
import Project from '../model/Project.model';
import ProjectRepository from '../repository/Project.repository';
import { ProjectInput, ProjectUpdateInput } from '../type/input/Project.input';
import ValidateInput from '../helper/ValidateInput';

export default class ProjectController {
	public static async getProjectByID(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { id }  = req.params;
            if(!id) return res.json({
                code: 400,
                success: false,
                message: 'PROJECT.GET.FAIL'
            });
            const project = await ProjectRepository.getProjectByID(id);
            res.json(project);
        } catch(error) {
            console.error(error);
        }
    }

	public static async createProject(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            
			const projectInput = new ProjectInput(req.body);
            const _id =  uuidv4();
            const project : Project = new Project({ _id , ...projectInput });

            if(!project) return res.json({
                code: 400,
                success: false,
                message: 'PROJECT.CREATE.FAIL'
            });
            const newProject = await ProjectRepository.createProject(project);

            return res.json(newProject);
        } catch(error) {
            console.error(error);
        }
    }

	public static async updateProject(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const projectUpdateInput = new ProjectUpdateInput(req.body);
            const validate = await ValidateInput(req, projectUpdateInput, 'BAD_REQUEST', true);
            
            console.log(validate);
            if (validate !== null) {
                return res.json(validate);
            }
			const { id } = req.params;
            const result = await ProjectRepository.updateProject(id, projectUpdateInput);
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

    public static async softDeleteProject(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
			const { id } = req.params;
            const userId = req.userID ? req.userID : 'temporary custom id user';
            const result = await ProjectRepository.softDeleteProject(id, userId);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

    public static async restoreProject(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
			const { id } = req.params;
            // const userId = req.userID ? req.userID : 'temporary custom id user';
            const result = await ProjectRepository.restoreProject(id);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

    public static async forceDeleteProject(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
			const { id } = req.params;
            const result = await ProjectRepository.forceDeleteProject(id);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }

	public static async getAll(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { limit , page } = req.query;
            const result = await ProjectRepository.getAll(abs(parseInt(page as string)), abs(parseInt(limit as string)));
            return res.json(result);
            
        } catch(error) {
            console.log(error);
        }
    }
}
