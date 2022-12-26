import { SoftDeleteDocument } from 'mongoose-delete';

import { Status } from '../enum/EOrder';
import IUser from './IUser';
import IOrderDetail from './IOrderDetail';

interface IOrder extends SoftDeleteDocument {
    _id: string;
    total: number;
    info: IUser[];
    status: Status;
    order_details: IOrderDetail[];
}

export default IOrder;