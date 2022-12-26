import { v4 as uuidv4 } from 'uuid';

import OrderSchema from '../database/schema/Order.schema';
import Response from '../type/response/Response';
import IOrder from 'type/interfaces/IOrder';

export default class OrderRepository{
    public static async getAll() : Promise<Response> {
		const orders = await OrderSchema.find({});
		console.log(orders);
		if(!orders || orders.length === 0) return {
			code: 403,
			success: false,
			message: 'GET_ORDERS.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_ORDERS.SUCCESS',
			data: orders,
		}; 
	}

	public static async getOne(id: string) : Promise<Response> {
		const order = await OrderSchema.findOne({ _id: id });
		if(!order) return {
			code: 403,
			success: false,
			message: 'GET_ORDER.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_ORDER.SUCCESS',
			data: order,
		}; 
	}

	public static async createNew(payload : IOrder) : Promise<Response> {
		const orderId = new OrderSchema({
			_id: uuidv4() 
		}); 
		payload['_id'] = orderId._id;
		const result = await OrderSchema.create(payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'POST_ORDER.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'POST_ORDER.SUCCESS',
			data: result,
		}; 
	}

	public static async update(payload: IOrder, id: string) : Promise<Response> {
		const result = await OrderSchema.updateOne({ _id: id }, payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'PUT_ORDER.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'PUT_ORDER.SUCCESS',
			data: result,
		}; 
	}

	public static async softDelete(id: string, userId: string) : Promise<Response> {
		const result = await OrderSchema.delete({ _id: id }, userId);
		if(!result) return {
			code: 403,
			success: false,
			message: 'SOFTDELETE_ORDER.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'SOFTDELETE_ORDER.SUCCESS',
			data: result,
		}; 
	}

	public static async restore(id: string) : Promise<Response> {
		const result = await OrderSchema.restore({ _id: id })
							.updateOne({ _id: id },{ $unset: { deletedBy: '', deletedAt: ''} });
		if(!result) return {
			code: 403,
			success: false,
			message: 'RESTORE_ORDER.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'RESTORE_ORDER.SUCCESS',
			data: result,
		}; 
	}

	public static async forceDelete(id: string) : Promise<Response> {
		const result = await OrderSchema.deleteOne({ _id: id });
		if(!result) return {
			code: 403,
			success: false,
			message: 'FORCEDELETE_ORDER.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'FORCEDELETE_ORDER.SUCCESS',
			data: result,
		}; 
	}
}

// ngày mai làm phần softDelete, forceDelete, restore