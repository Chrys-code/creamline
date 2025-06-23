export interface APIResponse<T> {
	statusCode: number;
	success: boolean;
	message: string;
	result?: T;
}
