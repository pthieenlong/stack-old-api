import { v4 as uuidv4 } from 'uuid';

import GroupSchema from '../database/schema/Group.schema';
import Response from '../type/response/Response';
import IGroup from 'type/interfaces/IGroup';

export default class GroupRepository{
    public static async getAll() : Promise<Response> {
		const groups = await GroupSchema.find({});
		console.log(groups);
		if(!groups || groups.length === 0) return {
			code: 403,
			success: false,
			message: 'GET_GROUPS.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_GROUPS.SUCCESS',
			data: groups,
		}; 
	}

	public static async getOne(id: string) : Promise<Response> {
		const group = await GroupSchema.findOne({ _id: id });
		if(!group) return {
			code: 403,
			success: false,
			message: 'GET_GROUP.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_GROUP.SUCCESS',
			data: group,
		}; 
	}

	public static async createNew(payload : IGroup) : Promise<Response> {
		console.log(payload);
		const groupId = new GroupSchema({
			_id: uuidv4() 
		}); 
		payload['_id'] = groupId._id;
		const result = await GroupSchema.create(payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'POST_GROUP.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'POST_GROUP.SUCCESS',
			data: result,
		}; 
	}

	public static async update(payload: IGroup, id: string) : Promise<Response> {
		const result = await GroupSchema.updateOne({ _id: id }, payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'PUT_GROUP.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'PUT_GROUP.SUCCESS',
			data: result,
		}; 
	}

	public static async softDelete(id: string, userId: string) : Promise<Response> {
		const result = await GroupSchema.delete({ _id: id }, userId);
		if(!result) return {
			code: 403,
			success: false,
			message: 'SOFTDELETE_GROUP.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'SOFTDELETE_GROUP.SUCCESS',
			data: result,
		}; 
	}

	public static async restore(id: string) : Promise<Response> {
		const result = await GroupSchema.restore({ _id: id })
							.updateOne({ _id: id },{ $unset: { deletedBy: '', deletedAt: ''} });
		if(!result) return {
			code: 403,
			success: false,
			message: 'RESTORE_GROUP.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'RESTORE_GROUP.SUCCESS',
			data: result,
		}; 
	}

	public static async forceDelete(id: string) : Promise<Response> {
		const result = await GroupSchema.deleteOne({ _id: id });
		if(!result) return {
			code: 403,
			success: false,
			message: 'FORCEDELETE_GROUP.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'FORCEDELETE_GROUP.SUCCESS',
			data: result,
		}; 
	}
}

// ngày mai làm phần softDelete, forceDelete, restore