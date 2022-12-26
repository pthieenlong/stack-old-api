import { GroupStatus } from 'type/enum/EGroup';
import { GroupRole } from 'type/enum/EUser';
export interface IGroup {
    _id: string,
    name: string,
    avatar: string,
    thumbnail: string,
    members: [
        member: {
            _id: string,
            name: string,
            role: [ GroupRole ],
            email: string
        }
    ],
    projects: [
        project: {
            _id: string,
            status: boolean,
            main_direct: string,
            ratings: number,
            thumbnail: string,
            description: string,
            author: string,
        }
    ],
    project_types: [
        project_type: {
            _id: string,
            name: string,
            quantity: number,
        }
    ],
    status: GroupStatus
}