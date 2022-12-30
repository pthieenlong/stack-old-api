/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Validator } from 'class-validator';
import CustomRequest from '../type/CustomRequest';
import Response from '../type/response/Response';

export default async function ValidateInput<T>(
    req: CustomRequest,
    input: any,
    message: any,
    showError: boolean = false
): Promise<Response<T> | null> {
    const validation = await new Validator().validate(input);

    if (validation.length > 0) {
        return {
            code: 400,
            message,
            success: false,
            errors: showError ? validation : undefined
        };
    }

    return null;
}