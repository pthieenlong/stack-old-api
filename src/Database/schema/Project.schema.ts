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
        rating: { type: Number, maxlength: 100, default: 0 },
        price: { type: Number, default: 0 },
        sale: { type: Number, default: 0 },
		savingLocale: {
            _id: { type: String, default: uuidv4() },
            link: { type: String, default: '' },
            status: { type: Number, default: SavingLocaleStatus.AVAILABLE },
        },
        project_types: [
            {
                _id: { type: String, required: true },
                name: { type: String, required: true },
            }
        ],
        status: { type: Number, default: ProjectStatus.AVAILABLE },
        thumbnail: { type: String, required: true },
        images: [
            { type: String, required: true }
        ],
        description: { 
            compatibleBrowsers: { type: String, default: '' },
            highResolution: { type: Boolean, default: true },
            themeForestFilesIncluded: { type: String, default: '' }
        },
        linkDemo: { type: String, default: ''}
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
