import { GroupStatus } from '../type/enum/EGroup';
import { GroupRole } from '../type/enum/EUser';

export default class Group {
    public _id: string;
    public name: string;
    public avatar?: string;
    public thumbnail?: string;
    public members: [
        member: {
            _id: string,
            name: string,
            roles: GroupRole[],
            email?: string
        }
    ];
    public projects?: [
        project: {
            _id: string,
            status: boolean,
            main_direct: string,
            ratings: number,
            thumbnail: string,
            description: string,
            author: string,
        }
    ];
    public project_types?: [
        project_type: {
            _id: string,
            name: string,
            quantity: number,
        }
    ];
    public status?: GroupStatus;

    constructor(group: Group) {
        this._id = group._id;
        this.avatar = group.avatar;
        this.name = group.name;
        this.thumbnail = group.thumbnail;
        this.members = group.members;
        this.projects = group.projects;
        this.project_types = group.project_types;
        this.status = GroupStatus.UNACTIVE;
    }
}