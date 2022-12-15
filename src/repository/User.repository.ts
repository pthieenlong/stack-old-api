import UserSchema from '../database/schema/User.schema';
import Response from '../type/response/Response';

export default class UserRepository {
    public static async getByID(userID: string):Promise<Response> {
		const user = await UserSchema.findOne({ _id: userID });
		if(!user) return {
			code: 403,
			success: false,
			message: 'GET_USER.NOT_FOUND',
		};
		const data = {
			username: user.username,
			email: user.email,
			phone: user.phone,
		};
		return {
			code: 200,
			success: true,
			message: 'GET_USER.SUCCESS',
			data,
		}; 
	}
}