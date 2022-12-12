import { Request } from 'express';

type CustomRequest = Request & {
	userID?: string;
};

export default CustomRequest;
