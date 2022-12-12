import { Active, Role } from 'type/enum/EUser';

export class User {
	public id: string;
	public username: string;
	public password: string;
	public email: string;
	public phone: string;
	public active: Active = Active.UNACTIVE;
	public roles: Role[] = [Role.USER];
	public refreshToken: string;

	constructor(user: User) {
		this.id = user.id;
		this.username = user.username;
		this.password = user.password;
		this.email = user.email;
		this.phone = user.phone;
		this.active = user.active;
		this.refreshToken = user.refreshToken;
		this.roles = user.roles;
	}
}
