import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomRequest from 'type/CustomRequest';
export const authVerifyMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')) {
        return res.json({
            status: 401,
            success: false,
            message: 'AUTH.LOGIN_REQUIRED',
        });
    }
    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN as string,
    ) as JwtPayload;
    if (!decoded) return res.json({
        status: 401,
        success: false,
        message: 'AUTH.LOGIN_REQUIRED'
    });
    req.username = decoded?.id;
    req.roles = decoded?.roles;
    next();
};