import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomRequest from '../type/CustomRequest';
export const activeAccountVerify = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const authHeader = req.headers.authorization;
    const token = req.body.token;
    if(!authHeader?.startsWith('Bearer ') || !token) {
        return res.json({
            status: 401,
            success: false,
            message: 'AUTH.LOGIN_REQUIRED',
        });
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.SECRET_EMAIL_TOKEN as string,
        ) as JwtPayload;
        if (!decoded) return res.json({
            status: 401,
            success: false,
            message: 'ACTIVE.EXPIRED'
        });
        req.email = decoded.email;
        next();
    } catch(error) {
        return res.json({
            status: 401,
            success: false,
            message: 'ACTIVE.EXPIRED'
        });
    }
};