import { Active, Role } from 'type/enum/EUser';

export class User {
	private id: string;
	private username: string;
	private password: string;
	private email: string;
	private phone: string;
	private active: Active = Active.UNACTIVE;
	private roles: Role[] = [Role.USER];
	private refreshToken: string;

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
