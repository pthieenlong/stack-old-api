import AuthRepository from '../repository/Auth.repository';
import CustomRequest from '../type/CustomRequest';
import { Response } from 'express';
export default class AuthController {
    public static async register(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const registerResult = await AuthRepository.register(req);
            return res.json(registerResult);
        } catch(error) {
            console.log(error);
            
            return res.json({
                error
            });
        }
    }
}