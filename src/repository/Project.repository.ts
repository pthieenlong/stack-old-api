import { v4 as uuidv4 } from 'uuid';

import ProjectSchema from '../database/schema/Project.schema';
import Response from '../type/response/Response';
import IProject from 'type/interfaces/IProject';

export default class ProjectRepository{
    public static async getAll() : Promise<Response> {
		const projects = await ProjectSchema.find({});
		console.log(projects);
		if(!projects || projects.length === 0) return {
			code: 403,
			success: false,
			message: 'GET_PROJECT.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_PROJECTS.SUCCESS',
			data: projects,
		}; 
	}

	public static async getOne(id: string) : Promise<Response> {
		const project = await ProjectSchema.findOne({ _id: id });
		if(!project) return {
			code: 403,
			success: false,
			message: 'GET_PROJECT.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'GET_PROJECTS.SUCCESS',
			data: project,
		}; 
	}

	public static async createNew(payload : IProject) : Promise<Response> {
		const projectId = new ProjectSchema({
			_id: uuidv4() 
		}); 
		payload['_id'] = projectId._id;
		const result = await ProjectSchema.create(payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'POST_PROJECT.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'POST_PROJECT.SUCCESS',
			data: result,
		}; 
	}

	public static async update(payload: IProject, id: string) : Promise<Response> {
		const result = await ProjectSchema.updateOne({ _id: id }, payload);
		if(!result) return {
			code: 403,
			success: false,
			message: 'PUT_PROJECT.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'PUT_PROJECT.SUCCESS',
			data: result,
		}; 
	}

	public static async softDelete(id: string, userId: string) : Promise<Response> {
		console.log(userId);
		const result = await ProjectSchema.delete({ _id: id }, userId);
		if(!result) return {
			code: 403,
			success: false,
			message: 'SOFTDELETE_PROJECT.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'SOFTDELETE_PROJECT.SUCCESS',
			data: result,
		}; 
	}

	public static async restore(id: string) : Promise<Response> {
		const result = await ProjectSchema.restore({ _id: id })
							.updateOne({ _id: id },{ $unset: { deletedBy: '', deletedAt: ''} });
		if(!result) return {
			code: 403,
			success: false,
			message: 'RESTORE_PROJECT.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'RESTORE_PROJECT.SUCCESS',
			data: result,
		}; 
	}

	public static async forceDelete(id: string) : Promise<Response> {
		const result = await ProjectSchema.deleteOne({ _id: id });
		if(!result) return {
			code: 403,
			success: false,
			message: 'FORCEDELETE_PROJECT.NOT_FOUND',
		};
		return {
			code: 200,
			success: true,
			message: 'FORCEDELETE_PROJECT.SUCCESS',
			data: result,
		}; 
	}
}

// ngày mai làm phần softDelete, forceDelete, restore