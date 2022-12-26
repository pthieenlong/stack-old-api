import mongoose, { Schema} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

import { Status } from '../../type/enum/EProject';
import IProject from 'type/interfaces/IProject';

const ProjectSchema = new Schema<IProject>(
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
    },
	{
		_id: false,
		timestamps: true,
	},
);

// Add Plugins to the Schema
ProjectSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, deletedByType: String });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = mongoose.model<IProject, SoftDeleteModel<IProject>>('Project', ProjectSchema);

export default model;
