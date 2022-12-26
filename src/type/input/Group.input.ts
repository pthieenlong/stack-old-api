import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { GroupRole } from 'type/enum/EUser';

export default class GroupInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsObject()
    @IsNotEmpty()
    members: [{
        _id: string,
        name: string,
        roles: GroupRole[],
    }];
    constructor(groupInput: GroupInput) {
        this.name = groupInput.name;
        this.members = groupInput.members;
    }
}