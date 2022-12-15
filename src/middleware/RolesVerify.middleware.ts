import { NextFunction, Response } from 'express';
import CustomRequest from '../type/CustomRequest';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function(allowRoles: string[]) {
    return async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
        if(!req?.roles) {
            return res.json({
                status: 401,
                success: false,
                message: 'ROLES.NOT_FOUND',
            });
        } else {
            const result = req.roles.map(role => allowRoles.includes(role)).find(val => val === true);
            if(!result) return res.json({
                status: 401,
                success: false,
                message: 'ROLES.NOT_ALLOW',
            });

            next();
        }
         
    };
}