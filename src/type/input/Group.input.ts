import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { GroupRole } from '../enum/EUser';

export class GroupInput {
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

export class GroupUpdateInput {
    @IsString()
    name?: string;

    @IsString()
    thumbnail?: string;

    @IsString()
    avatar?: string;

    constructor(groupUpdateInput: GroupUpdateInput) {
        this.name = groupUpdateInput.name;
        this.avatar = groupUpdateInput.avatar;
        this.thumbnail = groupUpdateInput.thumbnail;
    }
}