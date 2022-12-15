import { Response, NextFunction } from 'express';
import CustomRequest from '../type/CustomRequest';

export default async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const idParams = req.params.id;
    if(!idParams) return res.json({
        code: 409,
        success: false,
        message: 'GET_USERS.NOT_FOUND'
    });
    if(idParams !== req.userID) return res.json({
        code: 409,
        success: false,
        message: 'GET_USERS.NOT_FOUND'
    });
    next();
};