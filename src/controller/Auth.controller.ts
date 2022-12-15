import AuthRepository from '../repository/Auth.repository';
import CustomRequest from '../type/CustomRequest';
import { Response as ExpressResponse } from 'express';
export default class AuthController {
    public static async register(req: CustomRequest, res: ExpressResponse): Promise<ExpressResponse> {
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
    public static async login(req: CustomRequest, res: ExpressResponse): Promise<ExpressResponse> {
        try {
            const result = await AuthRepository.login(req);
            if(result?.success) {
                const token = result?.data?.accessToken;
                res.cookie('jwt', token as string, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 60 * 60 * 1000,
                });
            }
            return res.json(result);
        } catch(error) {
            console.log(error);
            return res.json({
                error
            });
        }
    }
}