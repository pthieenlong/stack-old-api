import mongoose, { Schema} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongooseDelete, { SoftDeleteModel, SoftDeleteDocument } from 'mongoose-delete';

import { ProjectStatus, SavingLocaleStatus } from '../../type/enum/EProject';
import IProject from '../../type/interfaces/IProject';

type ProjectType = IProject & SoftDeleteDocument;

const ProjectSchema = new Schema<ProjectType>(
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
            link: { type: String, required: true },
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
            { type: String, default: ''}
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

const model = mongoose.model<ProjectType, SoftDeleteModel<ProjectType>>('Project', ProjectSchema);

export default model;
