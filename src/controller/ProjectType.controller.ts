import CustomRequest from '../type/CustomRequest';
import { Response, Request } from 'express';
import ProjectTypeRepository from '../repository/ProjectType.repository';
import IProjectType from 'type/interfaces/IProjectType';

export default class ProjectTypeController {
	public static async getAll(req: Request, res: Response):Promise<Response> {	
		try {
			const result = await ProjectTypeRepository.getAll();
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
			const result = await ProjectTypeRepository.getOne(id);
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
			const payload : Required<IProjectType> = { ...req.body };
			const result = await ProjectTypeRepository.createNew(payload);
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
			const payload : Required<IProjectType> = { ...req.body };
			const projectTypeId : string = req.params.id;
			const result = await ProjectTypeRepository.update(payload, projectTypeId);
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
			const userId : string = req.userID ? req.userID : 'user or admin custom id';
			const result = await ProjectTypeRepository.softDelete(id, userId);
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
			const result = await ProjectTypeRepository.restore(id);
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
			const result = await ProjectTypeRepository.forceDelete(id);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

}
