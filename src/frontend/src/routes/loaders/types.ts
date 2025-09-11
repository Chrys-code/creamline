export interface RequireAuthLoaderData {
	userProfile: {
		uuid: string;
		email: string;
		profile_image: string;
		first_name: string;
		last_name: string;
	}
};

export interface RequireProducersLoaderData {
	producers: {
		uuid: string;
		name: string;
		address: string;
		contactEmail: string;
	}[];
}