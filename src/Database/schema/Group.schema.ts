import mongoose, { Schema} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

import IGroup from '../../type/interfaces/IGroup';
import { Role } from '../../type/enum/EUser';
import { Status as StatusProject } from '../../type/enum/EProject'; 
import { Status } from '../../type/enum/EGroup';

const GroupSchema = new Schema<IGroup>({
    _id: { type: String, required: true },
    groupName: { type: String, required: true },
    users: [
        {
            _id: { type: String, required: true },
            username: { type: String, required: true },
            email: { type: String, required: true },
            role: { type: String, required: true, default: Role.USER },
        }
    ],
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
    project_type: [
        {
            _id: { type: String, required: true },
            name: { type: String, required: true },
        }
    ],
    status: { type: String, required: true, default: Status.CONTINUE},
    avatar: { type: String, required: true }
}, {
    _id: false,
    timestamps: true,
});

// Add Plugins to the Schema
GroupSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, deletedByType: String });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = mongoose.model<IGroup, SoftDeleteModel<IGroup>>('Group', GroupSchema);

export default model;