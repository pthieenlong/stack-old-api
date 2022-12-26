import CustomRequest from '../type/CustomRequest';
import { Response, Request } from 'express';
import OrderRepository from '../repository/Order.repository';
import IOrder from 'type/interfaces/IOrder';

export default class OrderController {
	public static async getAll(req: Request, res: Response):Promise<Response> {	
		try {
			const result = await OrderRepository.getAll();
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
			const result = await OrderRepository.getOne(id);
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
			const payload : Required<IOrder> = { ...req.body };
			const result = await OrderRepository.createNew(payload);
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
			const payload : Required<IOrder> = { ...req.body };
			const orderId : string = req.params.id;
			const result = await OrderRepository.update(payload, orderId);
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
			const result = await OrderRepository.softDelete(id, userId);
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
			const result = await OrderRepository.restore(id);
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
			const result = await OrderRepository.forceDelete(id);
			return res.json(result);
		} catch (error) {
			console.log(error);
            return res.json({
                error
            });
		}
	}

}
