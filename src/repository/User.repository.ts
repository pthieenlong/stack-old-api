import UserSchema from '../database/schema/User.schema';
import Response from '../type/response/Response';
import { User } from '../model/User.model';
export default class UserRepository {
    public static async getByID(userID: string):Promise<Response> {
		const user = await UserSchema.findOne({ _id: userID });
		if(!user) return {
			code: 403,
			success: false,
			message: 'USER.GET.NOT_FOUND',
		};
		const data = {
			username: user.username,
			email: user.email,
			phone: user.phone,
		};
		return {
			code: 200,
			success: true,
			message: 'USER.GET.SUCCESS',
			data,
		}; 
	}
	public static async update(userID: string, userProperties: Partial<User>): Promise<Response> {
		const user = await UserSchema.findOne({ _id: userID });
		if(!user) return {
			code: 403,
			success: false,
			message: 'USER.GET.NOT_FOUND',
		};
		const result = await user.updateOne({...userProperties});
		if(!result) return {
			code: 204,
			success: false,
			message: 'USER.UPDATE.FAIL',
		};
		return {
			code: 200,
			success: true,
			message: 'USER.UPDATE.SUCCESS',
		}; 
	}
}