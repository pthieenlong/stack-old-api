import CustomRequest from '../type/CustomRequest';
import { Response, Request } from 'express';
import OrderDetailRepository from '../repository/OrderDetail.repository';
import IOrderDetail from 'type/interfaces/IOrderDetail';

export default class OrderDetailController {
	public static async getAll(req: Request, res: Response):Promise<Response> {	
		try {
			const result = await OrderDetailRepository.getAll();
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
			const result = await OrderDetailRepository.getOne(id);
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
			const payload : Required<IOrderDetail> = { ...req.body };
			const result = await OrderDetailRepository.createNew(payload);
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
			const payload : Required<IOrderDetail> = { ...req.body };
			const orderDetailId : string = req.params.id;
			const result = await OrderDetailRepository.update(payload, orderDetailId);
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
			const result = await OrderDetailRepository.softDelete(id, userId);
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
			const result = await OrderDetailRepository.restore(id);
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
			const result = await OrderDetailRepository.forceDelete(id);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

}
