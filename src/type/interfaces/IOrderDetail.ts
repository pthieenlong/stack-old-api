import { SoftDeleteDocument } from 'mongoose-delete';

import IProject from './IProject';

interface IOrderDetail extends SoftDeleteDocument {
    _id: string;
    project: IProject[];
    quantity: number;
    total: number;
}

export default IOrderDetail;