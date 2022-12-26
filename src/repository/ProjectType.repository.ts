import { v4 as uuidv4 } from 'uuid';

import ProjectTypeSchema from '../database/schema/ProjectType.schema';
import Response from '../type/response/Response';
import IProjectType from 'type/interfaces/IProjectType';

export default class ProjectTypeRepository{
    public static async getAll() : Promise<Response> {
		const projectsType = await ProjectTypeSchema.find({});
		console.log(projectsType);
		if(!projectsType || projectsType.length === 0) return {
			code: 403,
			success: false,
			message: 'GET_PROJECTSTYPE.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_PROJECTSTYPE.SUCCESS',
			data: projectsType,
		}; 
	}

	public static async getOne(id: string) : Promise<Response> {
		const projectType = await ProjectTypeSchema.findOne({ _id: id });
		if(!projectType) return {
			code: 403,
			success: false,
			message: 'GET_PROJECTTYPE.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_PROJECTTYPE.SUCCESS',
			data: projectType,
		}; 
	}

	public static async createNew(payload : IProjectType) : Promise<Response> {
		const projectTypeId = new ProjectTypeSchema({
			_id: uuidv4()
		}); 
		payload['_id'] = projectTypeId._id;
		const result = await ProjectTypeSchema.create(payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'POST_PROJECTTYPE.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'POST_PROJECTTYPE.SUCCESS',
			data: result,
		}; 
	}

	public static async update(payload: IProjectType, id: string) : Promise<Response> {
		const result = await ProjectTypeSchema.updateOne({ _id: id }, payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'PUT_PROJECTTYPE.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'PUT_PROJECTTYPE.SUCCESS',
			data: result,
		}; 
	}

	public static async softDelete(id: string, userId: string) : Promise<Response> {
		const result = await ProjectTypeSchema.delete({ _id: id }, userId);
		if(!result) return {
			code: 403,
			success: false,
			message: 'SOFTDELETE_PROJECTTYPE.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'SOFTDELETE_PROJECTTYPE.SUCCESS',
			data: result,
		}; 
	}

	public static async restore(id: string) : Promise<Response> {
		const result = await ProjectTypeSchema.restore({ _id: id })
							.updateOne({ _id: id },{ $unset: { deletedBy: '', deletedAt: ''} });
		if(!result) return {
			code: 403,
			success: false,
			message: 'RESTORE_PROJECTTYPE.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'RESTORE_PROJECTTYPE.SUCCESS',
			data: result,
		}; 
	}

	public static async forceDelete(id: string) : Promise<Response> {
		const result = await ProjectTypeSchema.deleteOne({ _id: id });
		if(!result) return {
			code: 403,
			success: false,
			message: 'FORCEDELETE_PROJECTTYPE.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'FORCEDELETE_PROJECTTYPE.SUCCESS',
			data: result,
		}; 
	}
}
