import CustomRequest from '../type/CustomRequest';
import { Response, Request } from 'express';
import GroupRepository from '../repository/Group.repository';
import IGroup from 'type/interfaces/IGroup';

export default class GroupController {
	public static async getAll(req: Request, res: Response):Promise<Response> {	
		try {
			const result = await GroupRepository.getAll();
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
			const result = await GroupRepository.getOne(id);
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
			const payload : Required<IGroup> = { ...req.body };
			const result = await GroupRepository.createNew(payload);
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
			const payload : Required<IGroup> = { ...req.body };
			const groupId : string = req.params.id;
			const result = await GroupRepository.update(payload, groupId);
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
			const userId : string = req.userID ? req.userID : 'custom id user';
			const result = await GroupRepository.softDelete(id, userId);
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
			const result = await GroupRepository.restore(id);
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
			const result = await GroupRepository.forceDelete(id);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

}
