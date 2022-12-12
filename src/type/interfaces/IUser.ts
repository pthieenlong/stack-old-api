import { Active, Role } from 'type/enum/EUser';

interface IUser {
	_id: string;
	roles: Role[];
	refreshToken: string;
	username: string;
	password: string;
	email: string;
	phone: string;
	active: Active;
}

export default IUser;
