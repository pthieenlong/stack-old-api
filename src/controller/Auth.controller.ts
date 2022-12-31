import AuthRepository from '../repository/Auth.repository';
import CustomRequest from '../type/CustomRequest';
import { Response as ExpressResponse } from 'express';
import { VerifyAccount } from '../type/input/Auth.input';
import ValidateInput from 'helper/ValidateInput';
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
    public static async verify(req: CustomRequest, res: ExpressResponse): Promise<ExpressResponse> {
        try {
            const verifyInput = new VerifyAccount({ code: req.body.code });
            const validate = await ValidateInput(req, verifyInput, 'BAD_REQUEST');
            if(validate !== null) 
                return res.json(validate);
            const result = await AuthRepository.verifyAccount(req);
            return res.json(result);
        } catch(error) {
            return res.json({ error });
        }
    }
}