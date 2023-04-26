import ICat from "../Models/ICat";
import ICatBreed from "../Models/ICatBreed";
const apiEndPoint = "https://api.thecatapi.com/v1";

export default class CatApi {
	apiKey: string;
	defaultFetchHeaders: RequestInit["headers"];
	constructor({ apiKey }: { apiKey: string }) {
		this.apiKey = apiKey;
		this.defaultFetchHeaders = {
			"x-api-key": this.apiKey,
		};
	}

	listBreeds = async (props?: {
		limit?: number;
		page?: number;
	}): Promise<ICatBreed[]> => {
		try {
			const { limit, page } = props || {};

			let url = `${apiEndPoint}/breeds?`;

			if (limit) {
				url += `limit=${limit}&`;
			}

			if (page) {
				url += `page=${page}&`;
			}

			const response = await fetch(url, {
				method: "GET",
				headers: {
					...this.defaultFetchHeaders,
				},
			});

			if (response.ok) {
				const breeds = await response.json();

				return breeds;
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			throw error;
		}
	};

	listCats = async (props?: {
		breedIds?: string[];
		page?: number;
		limit?: number;
		order?: "ASC" | "DESC" | "RAND";
		imageSize?: "small" | "med" | "full";
	}): Promise<ICat[]> => {
		try {
			const { breedIds, page, limit, order, imageSize } = props || {};

			let url = `${apiEndPoint}/images/search?`;

			if (breedIds) {
				url += `breed_ids=${breedIds.join(",")}&`;
			}

			if (page) {
				url += `page=${page}&`;
			}

			if (limit) {
				url += `limit=${limit}&`;
			}

			if (imageSize) {
				url += `size=${imageSize}&`;
			}

			if (order) {
				url += `order=${order}&`;
			}

			const response = await fetch(url, {
				method: "GET",
				headers: {
					...this.defaultFetchHeaders,
				},
			});

			if (response.ok) {
				const breeds = await response.json();

				return breeds;
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			throw error;
		}
	};

	getCat = async (props: {
		id: string;
		imageSize?: "small" | "med" | "full";
	}): Promise<ICat> => {
		try {
			const { id, imageSize } = props;

			let url = `${apiEndPoint}/images/${id}?`;

			if (imageSize) {
				url += `size=${imageSize}&`;
			}

			const response = await fetch(url, {
				method: "GET",
				headers: {
					...this.defaultFetchHeaders,
				},
			});

			if (response.ok) {
				const breeds = await response.json();

				return breeds;
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			throw error;
		}
	};
}
