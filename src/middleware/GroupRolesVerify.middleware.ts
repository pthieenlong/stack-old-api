/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { GroupRole } from 'type/enum/EUser';
import GroupRepository from '../repository/Group.repository';
import CustomRequest from '../type/CustomRequest';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function groupRolesVerify(allowRoles: GroupRole[]){
    return async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
        if(!req?.userID || !req?.params.id) {
            return res.json({
                status: 401,
                success: false,
                message: 'NOT_FOUND',
            });
        }
        const memberRolesResult = await GroupRepository.getMemberRolesByUserID(req.userID, req.params.id);
        if(memberRolesResult?.success == false) return res.json(memberRolesResult);
        const roles = memberRolesResult?.data as any;
        const result = allowRoles.map(role => roles.roles?.includes(role)).find(val => val === true);
        if(!result) return res.json({
            status: 401,
            success: false,
                message: 'ROLES.NOT_ALLOW',
        });
        next();
    };
}