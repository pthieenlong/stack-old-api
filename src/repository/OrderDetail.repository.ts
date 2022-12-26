import { v4 as uuidv4 } from 'uuid';

import OrderDetailSchema from '../database/schema/OrderDetail.schema';
import Response from '../type/response/Response';
import IOrderDetail from 'type/interfaces/IOrderDetail';

export default class OrderDetailRepository{
    public static async getAll() : Promise<Response> {
		const ordersDetails = await OrderDetailSchema.find({});
		console.log(ordersDetails);
		if(!ordersDetails || ordersDetails.length === 0) return {
			code: 403,
			success: false,
			message: 'GET_ORDERDETAILS.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_ORDERDETAILS.SUCCESS',
			data: ordersDetails,
		}; 
	}

	public static async getOne(id: string) : Promise<Response> {
		const orderDetail = await OrderDetailSchema.findOne({ _id: id });
		if(!orderDetail) return {
			code: 403,
			success: false,
			message: 'GET_ORDERDETAIL.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_ORDERDETAIL.SUCCESS',
			data: orderDetail,
		}; 
	}

	public static async createNew(payload : IOrderDetail) : Promise<Response> {
		const orderDetailId = new OrderDetailSchema({
			_id: uuidv4() 
		}); 
		payload['_id'] = orderDetailId._id;
		const result = await OrderDetailSchema.create(payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'POST_ORDERDETAIL.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'POST_ORDERDETAIL.SUCCESS',
			data: result,
		}; 
	}

	public static async update(payload: IOrderDetail, id: string) : Promise<Response> {
		const result = await OrderDetailSchema.updateOne({ _id: id }, payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'PUT_ORDERDETAIL.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'PUT_ORDERDETAIL.SUCCESS',
			data: result,
		}; 
	}

	public static async softDelete(id: string, userId: string) : Promise<Response> {
		const result = await OrderDetailSchema.delete({ _id: id }, userId);
		if(!result) return {
			code: 403,
			success: false,
			message: 'SOFTDELETE_ORDERDETAIL.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'SOFTDELETE_ORDERDETAIL.SUCCESS',
			data: result,
		}; 
	}

	public static async restore(id: string) : Promise<Response> {
		const result = await OrderDetailSchema.restore({ _id: id })
							.updateOne({ _id: id },{ $unset: { deletedBy: '', deletedAt: ''} });
		if(!result) return {
			code: 403,
			success: false,
			message: 'RESTORE_ORDERDETAIL.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'RESTORE_ORDERDETAIL.SUCCESS',
			data: result,
		}; 
	}

	public static async forceDelete(id: string) : Promise<Response> {
		const result = await OrderDetailSchema.deleteOne({ _id: id });
		if(!result) return {
			code: 403,
			success: false,
			message: 'FORCEDELETE_ORDERDETAIL.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'FORCEDELETE_ORDERDETAIL.SUCCESS',
			data: result,
		}; 
	}
}

// ngày mai làm phần softDelete, forceDelete, restore