import CustomRequest from '../type/CustomRequest';
import { Response } from 'express';
import UserRepository from '../repository/User.repository';

export default class UserController {
	public static async getByID(req: CustomRequest, res: Response):Promise<Response> {
		
		try {
			const result = await UserRepository.getByID(req.userID as string);
			return res.json(result);
		} catch(error) {
            console.log(error);
            return res.json({
                error
            });
        }
	}
	public static async update(res: Response):Promise<Response> {
		return res.json();
	}
}
