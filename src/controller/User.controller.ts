import Response from '../type/response/Response';

export class UserController {
	public static async getByID():Promise<Response> {
		return {
			code: 200,
			success: true,
			message: 'CREATE_USER.SUCCESS',
		}; 
	}
	public static async update():Promise<Response> {
		return {
			code: 200,
			success: true,
			message: 'CREATE_USER.SUCCESS',
		};
	}
	public static async create(): Promise<Response> {
		return {
			code: 200,
			success: true,
			message: 'CREATE_USER.SUCCESS',
		};
	}
}
