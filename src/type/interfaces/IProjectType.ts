import { SoftDeleteDocument } from 'mongoose-delete';

interface IProjectType extends SoftDeleteDocument  {
    _id: string;
    name: string;
}

export default IProjectType;