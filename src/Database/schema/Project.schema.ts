import mongoose, { Schema} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

import { ProjectStatus, SavingLocaleStatus } from '../../type/enum/EProject';
import IProject from '../../type/interfaces/IProject';

const ProjectSchema = new Schema<IProject>(
	{
		_id: { type: String, required: true },
        groupOwner: { 
            _id: { type: String, required: true },
            groupName: { type: String, required: true }
        },
        rating: { type: Number, maxlength: 100 },
        price: { type: Number, required: true },
        sale: { type: Number, default: 0 },
		savingLocale: {
            _id: { type: String, required: true, default: uuidv4() },
            link: { type: String, required: true },
            status: { type: Number, required: true, default: SavingLocaleStatus.AVAILABLE },
        },
        project_types: [
            {
                _id: { type: String, required: true },
                name: { type: String, required: true },
            }
        ],
        status: { type: Number, required: true, default: ProjectStatus.AVAILABLE },
        thumbnail: { type: String, required: true },
        images: [
            { type: String, required: true }
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
