import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomRequest from '../type/CustomRequest';
export default async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')) {
        return res.json({
            status: 401,
            success: false,
            message: 'AUTH.LOGIN_REQUIRED',
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(
            token,
            process.env.SECRET_ACCESS_TOKEN as string,
        ) as JwtPayload;
        console.log(decoded);
        if (!decoded) return res.json({
            status: 401,
            success: false,
            message: 'AUTH.LOGIN_REQUIRED'
        });
        req.username = decoded?.info.username;
        req.userID = decoded?.info.id;
        req.roles = decoded?.info.roles;
        next();
    } catch(error) {
        return res.json({
            status: 401,
            success: false,
            message: 'AUTH.LOGIN_REQUIRED'
        });
    }
    
};