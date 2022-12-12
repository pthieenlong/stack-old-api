import UserSchema from '../database/schema/User.schema';
import CustomRequest from 'type/CustomRequest';
import Response from '../type/response/Response';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
export default class AuthRepository {
    public static async register(req: CustomRequest): Promise<Response> {
        const { username, password, correctPassword, email, phone } = req.body;
        if(!username || !password || !correctPassword || !email || !phone) {
            return {
                code: 409,
                success: false,
                message: 'REGISTER_USER.REQUIRED',
            };
        }

        if(correctPassword != password) return {
            code: 409,
            success: false,
            message: 'REGISTER_USER.PASSWORD_INCORRECT',
        };
        const isExists = await UserSchema.find({ username });
        if(!isExists != false) return {
            code: 409,
            success: false,
            message: 'REGISTER_USER.EXIST',
        };
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new UserSchema({
            _id: uuidv4(),
            username,
            password: hashedPassword,
            email,
            phone
        });
        const isSuccess = await user.save();
        //Gửi mail cho người ta

        if(isSuccess) {
            return {
                code: 200,
                success: true,
                message: 'REGISTER_USER.SUCCESS',
            };
        }  else return {
            code: 409,
			success: false,
			message: 'REGISTER_USER.FAIL',
        };
    }
    public static async login(): Promise<Response> {
        return {
            code: 409,
            success: false,
            message: 'REGISTER_USER.REQUIRED',
        };
    }
}