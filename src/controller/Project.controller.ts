import CustomRequest from '../type/CustomRequest';
import { Response, Request } from 'express';
import ProjectRepository from '../repository/Project.repository';
import IProject from 'type/interfaces/IProject';

export default class ProjectController {
	public static async getAll(req: Request, res: Response):Promise<Response> {	
		try {
			const result = await ProjectRepository.getAll();
			return res.json(result);
		} catch(error) {
            console.log(error);
            return res.json({
                error
            });
        }
	}

	public static async getOne(req: Request, res: Response):Promise<Response> {	
		try {
			const id : string = req.params.id;
			const result = await ProjectRepository.getOne(id);
			return res.json(result);
		} catch(error) {
            console.log(error);
            return res.json({
                error
            });
        }
	}

	public static async create(req: CustomRequest, res: Response) : Promise<Response> {
		try {
			if (req.body === null) throw new Error('invalid type');
			const payload : Required<IProject> = { ...req.body };
			const result = await ProjectRepository.createNew(payload);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

	public static async update(req: CustomRequest, res: Response) : Promise<Response> {
		try {
			if (req.body === null) throw new Error('invalid type');
			if (req.params === undefined) throw new Error('error no id');
			const payload : Required<IProject> = { ...req.body };
			const projectId : string = req.params.id;
			const result = await ProjectRepository.update(payload, projectId);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

	public static async softDelete(req: CustomRequest, res: Response) : Promise<Response> {
		try {
			if (req.params === undefined) throw new Error('error no id');
			const id : string = req.params.id;
			const userId : string = req.userID ? req.userID : 'ewqeqwewqe';
			console.log(userId);
			const result = await ProjectRepository.softDelete(id, userId);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

	public static async restore(req: CustomRequest, res: Response) : Promise<Response> {
		try {
			if (req.params === undefined) throw new Error('error no id');
			const id : string = req.params.id;
			const result = await ProjectRepository.restore(id);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

	public static async forceDelete(req: CustomRequest, res: Response) : Promise<Response> {
		try {
			if (req.params === undefined) throw new Error('error no id');
			const id : string = req.params.id;
			const result = await ProjectRepository.forceDelete(id);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

}
