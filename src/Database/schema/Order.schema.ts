import mongoose, { Schema} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

import IOrder from '../../type/interfaces/IOrder';
import { Role } from '../../type/enum/EUser';
import { Status } from '../../type/enum/EOrder';
import { Status as StatusProject } from '../../type/enum/EProject';


const OrderSchema = new Schema<IOrder>({
    _id: { type: String, required: true },
    total: { type: Number, required: true },
    info: [
        {
            _id: { type: String, required: true },
            username: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: Number, required: true },
            roles: [
                { type: String, required: true, default: Role.USER },
            ]
        }
    ],
    status: { type: String, required: true, default: Status.PENDING },
    order_details: [
        {
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
                    status: { type: String, required: true, default: StatusProject.SELLING },
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
        }
    ]
}, {
    _id: false,
    timestamps: true,
});

// Add Plugins to the Schema
OrderSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, deletedByType: String });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = mongoose.model<IOrder, SoftDeleteModel<IOrder>>('Order', OrderSchema);

export default model;