import { ReadNotification, StatusNotification, TypeNotification } from '../enum/ENotification';

export default interface INotification {
    _id: string;
    user: {
        _id: string;
        username?: string;
    };
    sender: {
        _id: string;
        username: string;
    }
    type: TypeNotification;
    data: {
        message: string;
        projectId?: string;
        groupId?: string;
        orderId?: string;
        postId?: string;
    };
    status?: StatusNotification; 
    read?: ReadNotification;
// eslint-disable-next-line semi
};