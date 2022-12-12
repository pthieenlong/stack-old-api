/* eslint-disable semi */
export interface Pagination {
	limit: number;
	page: number;
	totalPage: number;
	totalItem?: number;
};
export default interface Response<T = object> {
	code: number;
	success: boolean;
	message: string;
	pagination?: Pagination;
	data?: T;
}
