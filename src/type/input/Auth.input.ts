import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccount {
    @IsString()
    @IsNotEmpty()
    code: string;

    constructor(verifyAccount: VerifyAccount) {
        this.code = verifyAccount.code;
    }
}