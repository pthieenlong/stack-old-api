import UserSchema from '../database/schema/User.schema';
import CustomRequest from 'type/CustomRequest';
import Response from '../type/response/Response';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { testSendMail } from '../util/SendMail';
import { Active, Role } from '../type/enum/EUser';
import { generateRandomNumber } from 'util/Ultils';
export default class AuthRepository {
    public static async register(req: CustomRequest): Promise<Response> {
        const { username, password, correctPassword, email, phone } = req.body;
        if(!username || !password || !correctPassword || !email || !phone) {
            return {
                code: 409,
                success: false,
                message: 'USER.REGISTER.REQUIRED',
            };
        }

        if(correctPassword != password) return {
            code: 409,
            success: false,
            message: 'USER.REGISTER.PASSWORD_INCORRECT',
        };
        const isExists = await UserSchema.find({ username });
        if(!isExists != false) return {
            code: 409,
            success: false,
            message: 'USER.REGISTER.EXIST',
        };
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new UserSchema({
            _id: uuidv4(),
            username,
            password: hashedPassword,
            email,
            phone,
            roles: [ Role.USER ],
            active: Active.UNACTIVE,
        });
        const isSuccess = await user.save();
        if(isSuccess) {
            return {
                code: 200,
                success: true,
                message: 'USER.REGISTER.SUCCESS',
            };
        }  else return {
            code: 409,
			success: false,
			message: 'USER.REGISTER.FAIL',
        };
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public static async login(req: CustomRequest) {
        const { username, password } = req.body;
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
    public static async sendVerifyTokenMail(req: CustomRequest): Promise<Response | void> {
        const { email } = req.body;
        if(!email) return {
            code: 400,
            success: true,
            message: 'MAIL.SEND.FAIL',
        };
        const randomKey = generateRandomNumber();
        const token = jwt.sign({},
            process.env.SECRET_EMAIL_TOKEN as string,
            { expiresIn: '5m'}
        );
        try {
            const result = await testSendMail(email);
            return {
                code: result ? 200 : 409,
                success: result ? true : false,
                message: result ? 'MAIL.SEND.SUCCESS' : 'MAIL.SEND.FAIL',
            };
        } catch( error) {
            return {
                code: 409,
                success: true,
                message: 'MAIL.SEND.FAIL',
            };
        }
    }

    // public static async verifyAccount():Promise<void> {
        
    // }
}