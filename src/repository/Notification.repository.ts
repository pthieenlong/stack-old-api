import NotificationSchema from '../database/schema/Notification.schema';
import Notification from '../model/Notification.model';
import Response from '../type/response/Response';
import { ReadNotification } from '../type/enum/ENotification';

export default class NotifyRepository {
    public static async getNotifyById(id: string) : Promise<Response> {
        const notify = await NotificationSchema.findOne({ _id: id });
        if(!notify) return {
            code: 204,
            success: false,
            message: 'NOTIFICATION.GET.FAIL'
        };
        return {
            code: 200,
            success: true,
            message: 'NOTIFICATION.GET.SUCCESS',
            data: notify,
        };
    }

    public static async getNotificationsSeenByRecipient(userId: string, limit?: number) : Promise<Response> { // đã xem
        if (limit) {
            const notifications = await NotificationSchema.find({ 'user._id': userId, read: ReadNotification.UNREAD })
                                    .limit(limit)
                                    .sort({ createdAt: 'desc' });
            return {
                code: 200,
                success: true,
                message: 'NOTIFICATION.GET.SUCCESS',
                data: notifications
            };
        }
        else {
            const notifications = await NotificationSchema.find({ 'user._id': userId , read: ReadNotification.UNREAD })
                                .sort({ createdAt: 'desc' });                     
            return {
                code: 200,
                success: true,
                message: 'NOTIFICATION.GET.SUCCESS',
                data: notifications
            };
        }
        
    }

    public static async getNotificationsNotSeenByRecipient(userId: string) : Promise<Response> { // chưa xem
        const notifications = await NotificationSchema.find({ 'user._id': userId , read: ReadNotification.READ })
                                .sort({ createdAt: 'desc' });                     
        return {
                code: 200,
                success: true,
                message: 'NOTIFICATION.GET.SUCCESS',
                data: notifications
        };

    }

    public static async createNotify(notifyProperties: Notification): Promise<Response> {
        const group = await NotificationSchema.create(notifyProperties);
        if(!group) return {
            code: 409,
            success: false,
            message: 'NOTIFICATION.CREATE.FAIL'
        };

        return {
            code: 200,
            success: true,
            message: 'NOTIFICATION.CREATE.SUCCESS',
        };
    }

    public static async deleteNotify(id: string): Promise<Response> {
        const group = await NotificationSchema.deleteOne({ _id: id });
        if(!group) return {
            code: 409,
            success: false,
            message: 'NOTIFICATION.DELETE.FAIL'
        };

        return {
            code: 200,
            success: true,
            message: 'NOTIFICATION.DELETE.SUCCESS',
        };
    }

    public static async actionSeenNotify(id: string, userId: string) : Promise<Response> {
        const result = await NotificationSchema.updateOne({ _id: id , 'user._id': userId }, { read: ReadNotification.READ });
        if (!result) return {
            code: 409,
            success: false,
            message: 'NOTIFICATION.PUT_READ.FAILED'
        };
        return {
            code: 200,
            success: true,
            message: 'NOTIFICATION.PUT_READ.SUCCESS',
        };
    }

}

