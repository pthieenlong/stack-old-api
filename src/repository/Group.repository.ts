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
            message: 'GROUP.CREATE.FAIl'
        };
        const group = await GroupSchema.create({
            ...groupPropteries,
        });
        if(!group) return {
            code: 409,
            success: false,
            message: 'GROUP.CREATE.FAIl'
        };

        return {
            code: 200,
            success: true,
            message: 'GROUP.CREATE.SUCCESS',
        };
    }
}