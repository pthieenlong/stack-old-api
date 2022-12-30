import mongoose, { Schema} from 'mongoose';
import mongooseDelete, { SoftDeleteModel, SoftDeleteDocument } from 'mongoose-delete';

import IProjectType from 'type/interfaces/IProjectType';

type TypeProject = IProjectType & SoftDeleteDocument;

const ProjectTypeSchema = new Schema<TypeProject>(
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

const model = mongoose.model<IProjectType, SoftDeleteModel<TypeProject>>('ProjectType', ProjectTypeSchema);

export default model;
