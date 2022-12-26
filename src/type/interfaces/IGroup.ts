import { SoftDeleteDocument } from 'mongoose-delete';

import { Role } from '../enum/EUser';
import InterfaceProject from './IProject';
import IProjectType from './IProjectType';
import { Status } from 'type/enum/EGroup';

type User = {
	_id: string;
	username: string;
	email: string;
	role: Role;
}


interface IGroup extends SoftDeleteDocument {
	_id: string;
	groupName: string;
	users: User[];
	project: InterfaceProject[];
	project_type: IProjectType[];
	status: Status;
	avatar: string;
}

export default IGroup;
