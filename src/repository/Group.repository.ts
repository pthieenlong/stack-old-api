import GroupSchema from '../database/schema/Group.schema';
import Group from '../model/Group.model';
import Response from '../type/response/Response';

export default class GroupRepository {
    public static async getGroupByID(id: string): Promise<Response> {
        const group = await GroupSchema.findOne({ _id: id });
        if(!group) return {
            code: 204,
            success: false,
            message: 'GROUP.GET.FAIL'
        };
        return {
            code: 200,
            success: true,
            message: 'GROUP.GET.SUCCESS',
            data: group,
        };
    }
    public static async createGroup(userID: string, groupPropteries: Group): Promise<Response> {
        const duplicate = await GroupSchema.findOne({ name: groupPropteries.name });
        if(duplicate) return {
            code: 409,
            success: false,
            message: 'GROUP.CREATE.FAIL'
        };
        const group = await GroupSchema.create({
            ...groupPropteries,
        });
        if(!group) return {
            code: 409,
            success: false,
            message: 'GROUP.CREATE.FAIL'
        };

        return {
            code: 200,
            success: true,
            message: 'GROUP.CREATE.SUCCESS',
        };
    }
	public static async updateGroupInfomations(groupID: string, groupUpdateProperties: Partial<Group>): Promise<Response> {
		const group = await GroupSchema.findOne({ _id: groupID});
		if(!group) return {
			code: 409,
			success: false,
			message: 'GROUP.UPDATE.FAIL'
		};

		const result = await group.updateOne(group.id, groupUpdateProperties);
		console.log(result);
		if(!result) return {
			code: 409, 
			success: false,
			message: 'GROUP.UPDATE.FAIL'
		};
		return {
			code: 200,
			success: true,
			message: 'GROUP.UPDATE.SUCCESS'
		};
	}
	public static async getAll(page = 1, limit = 10): Promise<Response> {
		const skip = limit * (page - 1);
		const groups = await GroupSchema.find();
        if(!groups) return {
            code: 204,
            success: false,
            message: 'GROUP.GET.FAIL'
        };
		const totalPage = Math.ceil(groups.length / limit);
		const data = groups.splice(skip, limit);
        
        return {
            code: 200,
            success: true,
            message: 'GROUP.GET.SUCCESS',
			data,
			pagination: {
				limit,
				page,
				totalPage,
				totalItem: groups.length || 0
			}
		};
	}
}