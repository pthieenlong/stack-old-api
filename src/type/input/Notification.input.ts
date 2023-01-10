import { IsNotEmpty, IsObject, IsOptional, IsString, IsNumber } from 'class-validator';
import { ReadNotification, StatusNotification, TypeNotification } from '../enum/ENotification';

// eslint-disable-next-line @typescript-eslint/ban-types
function ValidateType(target: Object, propertyKey: string) : void {
    let value: TypeNotification | null;
    Object.defineProperty(target, propertyKey, {
        get() {
            return value;
        },
        set(newValue: TypeNotification) {
            switch(newValue) {
                case TypeNotification.COMMENT: 
                    value = TypeNotification.COMMENT;
                    break;
                case TypeNotification.GROUP:
                    value = TypeNotification.GROUP;
                    break;
                case TypeNotification.ORDER:
                    value = TypeNotification.ORDER;
                    break;
                case TypeNotification.PROJECT:
                    value = TypeNotification.PROJECT;
                    break;
                default: 
                    value = null;
            }
        }

    });
}

// eslint-disable-next-line @typescript-eslint/ban-types
function ValidateData(target: Object, propertyKey: string) : void {
    let value : {
        message: string;
        projectId?: string;
        groupId?: string;
        orderId?: string;
        postId?: string;
    } | null;
    Object.defineProperty(target, propertyKey, {
        get() {
            return value;
        },
        set(newValue: {
            message: string;
            projectId?: string;
            groupId?: string;
            orderId?: string;
            postId?: string;
        }) {
            if (!newValue.message) {
                return value = null;
            }
            switch (this.type) {
                case TypeNotification.COMMENT:
                    newValue.postId ? value = {
                        message: newValue.message,
                        postId: newValue.postId
                    } : value = null;
                    break;
                case TypeNotification.GROUP:
                    newValue.groupId ? value = {
                        message: newValue.message,
                        groupId: newValue.groupId
                    } : value = null;
                    break;
                case TypeNotification.ORDER: 
                    newValue.orderId ? value = {
                        message: newValue.message,
                        orderId: newValue.orderId
                    } : value = null;
                    break;
                case TypeNotification.PROJECT:
                    newValue.projectId ? value = {
                        message: newValue.message,
                        projectId: newValue.projectId
                    } : value = null;
                    break;
                default:
                    value = null;
                    break;
            }
        }
    });
}

export class NotificationInput {
    @IsObject()
    @IsNotEmpty()
    user: {
        _id: string;
        username?: string;
    };

    @IsObject()
    @IsNotEmpty()
    sender: {
        _id: string;
        username: string;
    };
    
    @ValidateType
    @IsString()
    @IsNotEmpty()
    type: TypeNotification | null;


    @ValidateData
    @IsObject()
    @IsNotEmpty()
    data: {
        message: string;
        projectId?: string;
        groupId?: string;
        orderId?: string;
        postId?: string;
    } | null;

    @IsNumber()
    @IsOptional()
    status?: StatusNotification; 

    @IsNumber()
    @IsOptional()
    read?: ReadNotification;

    constructor(notifyInput: NotificationInput) {
        this.user = notifyInput.user;
        this.sender = notifyInput.sender;
        this.type = notifyInput.type;
        this.data = notifyInput.data;
        this.status = notifyInput.status;
        this.read = notifyInput.read;
    }
}