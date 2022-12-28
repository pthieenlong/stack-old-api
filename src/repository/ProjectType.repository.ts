import ProjectTypeSchema from '../database/schema/ProjectType.schema';
import Response from '../type/response/Response';
import ProjectType from '../model/ProjectType.model';

export default class ProjectTypeRepository{
    public static async getProjectByID(id: string): Promise<Response> {
        const project = await ProjectTypeSchema.findOne({ _id: id });
        if(!project) return {
            code: 204,
            success: false,
            message: 'PROJECT_TYPE.GET.FAIL'
        };
        return {
            code: 200,
            success: true,
            message: 'PROJECT_TYPE.GET.SUCCESS',
            data: project,
        };
    }

	public static async createProjectType( userID: string, projectTypePropteries: ProjectType): Promise<Response> {
        const projectType = await ProjectTypeSchema.create({
            ...projectTypePropteries,
        });
        if(!projectType) return {
            code: 409,
            success: false,
            message: 'PROJECT_TYPE.CREATE.FAIL'
        };

        return {
            code: 200,
            success: true,
            message: 'PROJECT_TYPE.CREATE.SUCCESS',
        };
    }

	public static async updateProjectType(projectTypeId: string, projectTypeUpdateProperties: ProjectType) : Promise<Response> {
		const projectType = await ProjectTypeSchema.updateOne({ _id: projectTypeId }, projectTypeUpdateProperties);
		
		if(!projectType) return {
			code: 409,
			success: false,
			message: 'PROJECT_TYPE.UPDATE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT_TYPE.UPDATE.SUCCESS',
		};
	}

	public static async softDeleteProject(projectTypeId: string, userId : string) : Promise<Response> {
		const projectType = await ProjectTypeSchema.delete({ _id: projectTypeId }, userId);
		if(!projectType) return {
			code: 409,
			success: false,
			message: 'PROJECT_TYPE.SOFT_DELETE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT_TYPE.SOFT_DELETE.SUCCESS',
		};
	}

	public static async restoreProjectType(projectTypeId: string ) : Promise<Response> {
		const projectType = await ProjectTypeSchema.restore({ _id: projectTypeId })
							.updateOne({ _id: projectTypeId }, { $unset: { deletedBy: '', deletedAt: ''} });
		if(!projectType) return {
			code: 409,
			success: false,
			message: 'PROJECT_TYPE.RESTORE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT_TYPE.RESTORE.SUCCESS',
		};
	}

	public static async forceDeleteProjectType(projectTypeId: string ) : Promise<Response> {
		const result = await ProjectTypeSchema.deleteOne({ _id: projectTypeId });
		if(!result) return {
			code: 409,
			success: false,
			message: 'PROJECT_TYPE.FORCE_DELETE.FAIL'
		};

		return {
			code: 200,
			success: true,
			message: 'PROJECT_TYPE.FORCE_DELETE.SUCCESS',
		};
	}

	public static async getAll(page= 1, limit = 10) : Promise<Response> {
		const skip : number = limit * (page - 1);
		const projectsType = await ProjectTypeSchema.find({})
								.skip(skip)
								.limit(limit);
		const totalLength = await ProjectTypeSchema.countDocuments();
		const totalPage : number = Math.ceil(totalLength / limit);

		if(!projectsType) return {
			code: 204,
			success: false,
			message: 'PROJECT_TYPE.GET.FAIL'
		};
		return {
			code: 200,
			success: true,
			message: 'PROJECT_TYPE.GET.SUCCESS',
			data: projectsType,
			pagination: {
				limit,
				page,
				totalPage,
				totalItem: projectsType.length || 0
			}
		};
	}
}
