import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { GroupRole } from 'type/enum/EUser';

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
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    thumbnail: string;

    @IsOptional()
    @IsString()
    avatar: string;

    constructor(groupUpdateInput: GroupUpdateInput) {
        this.name = groupUpdateInput.name;
        this.avatar = groupUpdateInput.avatar;
        this.thumbnail = groupUpdateInput.thumbnail;
    }
}
export class GroupAddMemberInput {
    @IsNotEmpty()
    @IsString()
    _id: string;
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    email?: string;

    constructor(groupAddMemberInput: GroupAddMemberInput) {
        this._id = groupAddMemberInput._id;
        this.name = groupAddMemberInput.name;
        this.email = groupAddMemberInput.email;
    }
}