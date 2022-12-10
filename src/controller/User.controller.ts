import CustomRequest from '../type/CustomRequest';
import Response from '../type/response/Response';

export class UserController {
	public static async getByID() {}
	public static async update() {}
	public static async create(req: CustomRequest): Promise<Response> {
		return {
			code: 200,
			success: true,
			message: 'CREATE_USER.SUCCESS',
		};
	}
}
