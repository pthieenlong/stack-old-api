import mongoose,{ Schema } from 'mongoose';

import INotification from '../../type/interfaces/INotification';
import { StatusNotification, ReadNotification } from '../../type/enum/ENotification';


const NotificationSchema = new Schema<INotification>({
    _id: { type: String, required: true },
    user: {
        _id: { type: String, required: true },
        username: { type: String, required: true }
    },
    sender: {
        _id: { type: String, required: true },
        username: { type: String, required: true }
    },
    type: { type: String, required: true },
    data: {
        message: { type: String, required: true },
        projectId: { type: String },
        groupId: { type: String },
        orderId: { type: String },
        postId: { type: String }
    },
    status: { type: Number, default: StatusNotification.SUCCESS },
    read: { type: Number, default: ReadNotification.UNREAD }

}, {
    _id: false,
    timestamps: true,
});


export default mongoose.model('notification', NotificationSchema);