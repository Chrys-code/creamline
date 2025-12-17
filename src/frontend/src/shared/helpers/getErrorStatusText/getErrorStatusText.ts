import { tTyped } from "../../../configs/i18n";

export const getErrorStatusText = (statusCode: number): string => {
	const tNetworkErrors = tTyped("errors");

	switch (statusCode) {
		case 400: // Bad request
			return tNetworkErrors("error_codes.400");
		case 401: // Unauthorized
			return tNetworkErrors("error_codes.401");
		case 403: // Forbidden (authenticated but no permissions)
			return tNetworkErrors("error_codes.403");
		case 404: // Not found
			return tNetworkErrors("error_codes.404");
		case 500: // Internal server error
			return tNetworkErrors("error_codes.500");
		default:
			return tNetworkErrors("error_codes.500");
	}
};
