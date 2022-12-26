import mongoose, { Schema} from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import { v4 as uuidv4 } from 'uuid';

import IOrderDetail from '../../type/interfaces/IOrderDetail';
import { Status } from '../../type/enum/EProject';

const OrderDetailSchema = new Schema<IOrderDetail>({
    _id: { type: String, required: true },
    project: [
        {
            _id: { type: String, required: true },
            groupOwner: { type: String, required: true },
            rating: { type: Number, maxlength: 100 },
            price: { type: Number, required: true },
            sale: { type: Number, default: 0 },
            savingLocale: [
                {
                    id: { type: String, required: true, default: uuidv4() },
                    link: { type: String, required: true },
                    status: { type: String, required: true },
                }
            ],
            projectType: [
                {
                    name: { type: String, required: true },
                }
            ],
            status: { type: String, required: true, default: Status.SELLING },
            thumbnail: { type: String, required: true },
            images: [
                {
                    url: { type: String, required: true },
                }
            ],
            description: { 
                compatibleBrowsers: { type: String, required: true },
                highResolution: { type: Boolean, default: true },
                themeForestFilesIncluded: { type: String, required: true }
            },
            linkDemo: { type: String, required: true }
        }
    ],
    quantity: { type: Number, required: true },
    total: { type: Number, required: true }
}, {
    _id: false,
    timestamps: true,
});

// Add Plugins to the Schema
OrderDetailSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, deletedByType: String });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = mongoose.model<IOrderDetail, SoftDeleteModel<IOrderDetail>>('OrderDetail', OrderDetailSchema);

export default model;