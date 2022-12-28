import Response from '../type/response/Response';
import ProjectSchema from '../database/schema/Project.schema';
import Project from '../model/Project.model';


export default class ProjectRepository{
    public static async getProjectByID(id: string): Promise<Response> {
        const project = await ProjectSchema.findOne({ _id: id });
        if(!project) return {
            code: 204,
            success: false,
            message: 'PROJECT.GET.FAIL'
        };
        return {
            code: 200,
            success: true,
            message: 'PROJECT.GET.SUCCESS',
            data: project,
        };
    }

	public static async createProject( userID: string, projectPropteries: Project): Promise<Response> {
        const project = await ProjectSchema.create({
            ...projectPropteries,
        });
        if(!project) return {
            code: 409,
            success: false,
            message: 'PROJECT.CREATE.FAIL'
        };

        return {
            code: 200,
            success: true,
            message: 'PROJECT.CREATE.SUCCESS',
        };
    }

	public static async updateProject(projectId: string, projectUpdateProperties: Project) : Promise<Response> {
		const project = await ProjectSchema.updateOne({ _id: projectId }, projectUpdateProperties);
		
		if(!project) return {
			code: 409,
			success: false,
			message: 'PROJECT.UPDATE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT.UPDATE.SUCCESS',
		};
	}

	public static async softDeleteProject(projectId: string, userId : string) : Promise<Response> {
		const project = await ProjectSchema.delete({ _id: projectId }, userId);
		if(!project) return {
			code: 409,
			success: false,
			message: 'PROJECT.SOFT_DELETE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT.SOFT_DELETE.SUCCESS',
		};
	}

	public static async restoreProject(projectId: string ) : Promise<Response> {
		const project = await ProjectSchema.restore({ _id: projectId })
						.updateOne({ _id: projectId }, { $unset: { deletedBy: '', deletedAt: ''} });
		
		if(!project) return {
			code: 409,
			success: false,
			message: 'PROJECT.RESTORE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT.RESTORE.SUCCESS',
		};
	}

	public static async forceDeleteProject(projectId: string ) : Promise<Response> {
		const result = await ProjectSchema.deleteOne({ _id: projectId });
		if(!result) return {
			code: 409,
			success: false,
			message: 'PROJECT.FORCE_DELETE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT.FORCE_DELETE.SUCCESS',
		};
	}

	public static async getAll(page = 1, limit = 10) : Promise<Response> {
		const skip : number = limit * (page - 1);
		const projects = await ProjectSchema.find({})
								.skip(skip)
								.limit(limit);
		const totalLength = await ProjectSchema.countDocuments();
		const totalPage : number = Math.ceil(totalLength / limit);

		if(!projects) return {
			code: 204,
			success: false,
			message: 'PROJECT.GET.FAIL'
		};
		return {
			code: 200,
			success: true,
			message: 'PROJECT.GET.SUCCESS',
			data: projects,
			pagination: {
				limit,
				page,
				totalPage,
				totalItem: projects.length || 0
			}
		};
		
	}
}
