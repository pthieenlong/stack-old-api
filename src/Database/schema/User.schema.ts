import mongoose, { Schema } from 'mongoose';
import { Active, Role } from '../../type/enum/EUser';
import IUser from '../../type/interfaces/IUser';

const userSchema = new Schema<IUser>(
	{
		_id: {
			type: String,
			required: true,
		},
		roles: [
			{
				type: String,
				required: true,
				default: Role.USER,
			},
		],
		refreshToken: {
			type: String,
		},
		active: {
			default: Active.UNACTIVE,
		},
		email: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			default: '',
		}
	},
	{
		_id: false,
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
