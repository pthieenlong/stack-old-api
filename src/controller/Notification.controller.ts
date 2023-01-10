/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import ValidateInput from '../helper/ValidateInput';
import Notification from '../model/Notification.model';
import NotificationRepository from '../repository/Notification.repository';
import CustomRequest from '../type/CustomRequest';
import { NotificationInput } from '../type/input/Notification.input';
import IUser from '../type/interfaces/IUser';

export default class NotifyController {
    public static async getNotifyByID(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { id } = req.params;
            if(!id) return res.json({
                code: 400,
                success: false,
                message: 'NOTIFICATION.GET.FAIL'
            });
            const notify = await NotificationRepository.getNotifyById(id);
            res.json(notify);
        } catch(error) {
            console.error(error);
        }
    }

    public static async getNotificationsByRecipient(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            if(!req.userID || !req.username) return res.json({
                code: 400,
                success: false,
                message: 'NOTIFICATION.GET.FAIL'
            });
            const { limit } = req.query;
            const userId : string = req.userID;
            if (limit) {
                const notifications = await NotificationRepository.getNotificationsSeenByRecipient(userId, parseInt(limit as string));
                res.json(notifications);
            }
            else {
                const notifications = await NotificationRepository.getNotificationsSeenByRecipient(userId);
                res.json(notifications);
            }

        } catch (error) {
            console.log(error);
        }
    }

    public static async getNotificationsNotSeenByRecipient(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            if(!req.userID || !req.username) return res.json({
                code: 400,
                success: false,
                message: 'NOTIFICATION.GET.FAIL'
            });
            const userId : string = req.userID;
            const notifications = await NotificationRepository.getNotificationsNotSeenByRecipient(userId);
            res.json(notifications);
        } catch (error) {
            console.log(error);
        }
    }

    public static async createNotify(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const sender : Partial<IUser> = {
                _id: req.userID,
                username: req.username,
            };
            const notifyInput = new NotificationInput({ sender ,...req.body });
            const validate = await ValidateInput(req, notifyInput, 'BAD_REQUEST');
            if (validate !== null) return res.json(validate);

            const _id : string = uuidv4();
            const notify = new Notification({ _id, ...notifyInput, type: notifyInput.type, data: notifyInput.data });
            const result = await NotificationRepository.createNotify(notify);

            return res.json(result);
        } catch(error) {
            console.error(error);
        }
    }

    public static async deleteNotify(req: CustomRequest, res: Response): Promise<Response | void> {
        try {
            const { id } = req.params;
            if (!id) return res.json({
                code: 400,
                success: false,
                message: 'NOTIFICATION.DELETE.FAIL'
            });

            const result = await NotificationRepository.deleteNotify(id);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }

    }

    public static async actionSeenNotify(req: CustomRequest, res: Response): Promise<Response | void>{
        try {
            if (!req.userID || !req.username) {
                return res.json({
                    code: 400,
                    success: false,
                    message: 'NOTIFICATION.PUT_READ.FAIL'
                });
            }
            const { id }  = req.params;
            
            if (!id) return res.json({
                code: 400,
                success: false,
                message: 'NOTIFICATION.PUT_READ.FAIL'
            });
            const regexId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
            if (!regexId.test(id)) return res.json({
                code: 400,
                success: false,
                message: 'NOTIFICATION.PUT_READ.FAIL'
            });
            const userId : string = req.userID;
            const result = await NotificationRepository.actionSeenNotify(id, userId);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }
    
}

