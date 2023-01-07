import { TypeNotification, StatusNotification, ReadNotification } from '../type/enum/ENotification';


export default class TypeNotify {
    public _id: string;
    public user: {
        _id: string;
        username?: string;
    };
    public sender: {
        _id: string;
        username: string;
    };
    public type: TypeNotification | null;
    public data: {
        message: string;
        projectId?: string;
        groupId?: string;
        orderId?: string;
        postId?: string;
    } | null;
    public status?: StatusNotification; 
    public read?: ReadNotification;

    constructor(typeNotify: TypeNotify) {
        this._id = typeNotify._id;
        this.user = typeNotify.user;
        this.sender = typeNotify.sender;
        this.type = typeNotify.type;
        this.status = typeNotify.status;
        this.read = typeNotify.read;
        this.data = typeNotify.data;
    }
}