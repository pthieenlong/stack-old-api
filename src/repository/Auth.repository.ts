import UserSchema from '../database/schema/User.schema';
import CustomRequest from 'type/CustomRequest';
import Response from '../type/response/Response';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public static async login(req: CustomRequest) {
        const { username, password } = req.body;
        console.log(username);
        console.log(password);
        if(!username || !password) return {
            code: 409,
            success: false,
            message: 'LOGIN_USER.REQUIRED',
        };
        const user = await UserSchema.findOne({ username });
        if(!user) return {
            code: 409,
            success: false,
            message: 'LOGIN_USER.NOT_FOUND',
        };
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return {
                code: 409,
                success: false,
                message: 'LOGIN_USER.INCORRECT',
            };
        } else {
            const refreshToken = jwt.sign(
                {   info: {
                        username: user.username,
                        roles: user.roles,
                        id: user._id
                    }
                }
                , process.env.SECRET_REFRESH_TOKEN as string
                , { expiresIn: '30d'}
            );
            const accessToken = jwt.sign(
                {   info: {
                        username: user.username,
                        roles: user.roles,
                        id: user._id
                    }
                }
                , process.env.SECRET_ACCESS_TOKEN as string
                , { expiresIn: '1h'}
            );
            user.token = refreshToken;
            await user.save();
            return {
                code: 200,
                success: true,
                message: 'LOGIN.SUCCESS',
                data: {
                    accessToken
                }
            };
        };
    }
}