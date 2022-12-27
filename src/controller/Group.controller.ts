import { Response } from 'express';
import Group from '../model/Group.model';
import GroupRepository from '../repository/Group.repository';
import CustomRequest from '../type/CustomRequest';
import { GroupStatus } from '../type/enum/EGroup';
import { GroupInput, GroupUpdateInput } from '../type/input/Group.input';
import { v4 as uuidv4 } from 'uuid';
import { GroupRole } from '../type/enum/EUser';
import { abs } from 'mathjs';
export default class GroupController {
    public static async getGroupByID(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { id } = req.params;
            if(!id) return res.json({
                code: 400,
                success: false,
                message: 'GROUP.GET.FAIL'
            });
            const group = await GroupRepository.getGroupByID(id);
            res.json(group);
        } catch(error) {
            console.error(error);
        }
    }
    public static async createGroup(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            if(!req.userID || !req.username) return res.json({
                code: 400,
                success: false,
                message: 'GROUP.CREATE.FAIL'
            });
            
            const groupInput = new GroupInput({name: req.body.name, members: [
                {
                    _id: req.userID,
                    name: req.username,
                    roles: [ GroupRole.OWNER ]
                }
            ]});
            const _id = uuidv4();
            const group = new Group({_id, ...groupInput, status: GroupStatus.UNACTIVE});

            if(!group) return res.json({
                code: 400,
                success: false,
                message: 'GROUP.CREATE.FAIL'
            });
            const newGroup = await GroupRepository.createGroup(req.userID, group);

            return res.json(newGroup);
        } catch(error) {
            console.error(error);
        }
    }
    public static async updateGroupInfomations(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const groupUpdateInput = new GroupUpdateInput({...req.body});
            const result = await GroupRepository.updateGroupInfomations(req.body.groupID, groupUpdateInput);
            console.log(`result: ${result}`);
            
            return res.json(result);
            
        } catch(error) {
            console.error(error);
        }
    }
    public static async getAll(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { limit = 10, page = 1 } = req.query;
            const result = await GroupRepository.getAll(abs(parseInt(page as string)), abs(parseInt(limit as string)));

            return res.json(result);
        } catch(error) {
            console.log(error);
        }
    }
}

