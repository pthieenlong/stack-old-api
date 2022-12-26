import mongoose, { Schema} from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

import IProjectType from 'type/interfaces/IProjectType';

const ProjectTypeSchema = new Schema<IProjectType>(
	{
		_id: { type: String, required: true },
        name: { type: String, required: true },
    },
	{
		_id: false,
		timestamps: true,
	},
);

// Add Plugins to the Schema
ProjectTypeSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true, deletedByType: String });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = mongoose.model<IProjectType, SoftDeleteModel<IProjectType>>('ProjectType', ProjectTypeSchema);

export default model;
