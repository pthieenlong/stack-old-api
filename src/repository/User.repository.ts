import UserSchema from '../database/schema/User.schema';
import Response from '../type/response/Response';

export default class UserRepository {
    public static async getByID(userID: string):Promise<Response> {
		const user = await UserSchema.findOne({ _id: userID });
		if(!user) return {
			code: 403,
			success: false,
			message: 'USER.GET.FAIL',
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
	public static async getUserRoles(userID: string):Promise<Response> {
		const user = await UserSchema.findOne({ _id: userID });
		if(!user) return {
			code: 403,
			success: false,
			message: 'USER.GET_ROLES.FAIL',
		};
		const data = {
			roles: user.roles,
		};
		return {
			code: 200,
			success: true,
			message: 'USER.GET_ROLES.SUCCESS',
			data
		}; 
    }
	public static async getUserByEmail(email: string):Promise<Response> {
		const user = await UserSchema.findOne({ email });
		if(!user) return {
			code: 403,
			success: false,
			message: 'USER.GET.FAIL',
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
}