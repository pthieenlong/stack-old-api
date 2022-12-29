import mongoose, { Schema } from 'mongoose';
import { GroupStatus } from '../../type/enum/EGroup';
import { IGroup } from '../../type/interfaces/IGroup';

const groupSchema = new Schema<IGroup>({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: '',
    },
    thumbnail: {
        type: String,
        default: '',
    },
    members: [
        {
            _id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            roles: [ {
                type: String,
                required: true,
            } ],
            email: {
                type: String,
            },
        }
    ],
    projects: [
        {
            _id: {
                type: String,
                required: true,
            },
            status: {
                type: Boolean,
                required: true,
                default: true
            },
            main_direct: {
                type: String,
                required: true,
            },
            ratings: {
                type: Number,
                required: true,
                default: 0
            },
            thumbnail: {
                type: String,
            },
            description: {
                type: String,
            },
            author: {
                type: String,
                required: true,
            },
        }
    ],
    project_types: [
        {
            _id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
                default: 0,
            },
        }
    ],
    status: {
        default: GroupStatus.UNACTIVE
    }
},
{
    _id: false,
    timestamps: true,
});

export default mongoose.model('Group', groupSchema);