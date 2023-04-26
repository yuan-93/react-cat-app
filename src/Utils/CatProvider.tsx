import React from "react";
import TheCatApi from "../Services/TheCatApi";
import { theCatApiKey } from "../config";
import ICatBreed from "../Models/ICatBreed";
import ICat from "../Models/ICat";
import Alert from "react-bootstrap/Alert";
import Loader from "../Components/Loader";

export interface ICatContextProps {
	breeds: ICatBreed[];
	cat: ICat | undefined;
	cats: ICat[];
	loading: boolean;
	endOfPage: boolean;
	errorMessage: string | undefined;
	getCat: (props: { id: string; imageSize: "small" | "med" | "full" }) => void;
	listCats: (props: {
		breedId: string;
		imageSize: "small" | "med" | "full";
		order: "ASC" | "DESC" | "RAND";
		page: number;
		limit: number;
	}) => void;
	listBreeds: () => void;
	resetCats: () => void;
}

const CatContext = React.createContext<ICatContextProps>({
	breeds: [],
	cat: undefined,
	cats: [],
	loading: false,
	endOfPage: false,
	errorMessage: undefined,
	getCat: () => {},
	listCats: () => {},
	listBreeds: () => {},
	resetCats: () => {},
});

const catApi = new TheCatApi({ apiKey: theCatApiKey });

const defaultErrorMessage =
	"Apologies but we could not load new cats for you at this time! Miau!";

export function CatProvider({ children }: { children?: React.ReactNode }) {
	const [breeds, setBreeds] = React.useState<ICatBreed[]>([]);
	const [cat, setCat] = React.useState<ICat>();
	const [cats, setCats] = React.useState<ICat[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [endOfPage, setEndOfPage] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
	const [currentBreedId, setCurrentBreedId] = React.useState<string>();

	const getCat = async (props: {
		id: string;
		imageSize: "small" | "med" | "full";
	}) => {
		try {
			const { id, imageSize } = props;
			setLoading(true);
			setErrorMessage(undefined);
			setCat(await catApi.getCat({ id, imageSize }));
		} catch (error) {
			setErrorMessage(defaultErrorMessage);
		} finally {
			setLoading(false);
		}
	};

	const listCats = async (props: {
		breedId: string;
		imageSize: "small" | "med" | "full";
		order: "ASC" | "DESC" | "RAND";
		page: number;
		limit: number;
	}) => {
		try {
			const { breedId, imageSize, order, page, limit } = props;
			if (endOfPage) {
				return;
			}
			if (currentBreedId === breedId && endOfPage) {
				return;
			}
			if (Boolean(cats[page * limit])) {
				return;
			}

			setLoading(true);
			setErrorMessage(undefined);
			const newCats = await catApi.listCats({
				breedIds: [breedId],
				limit,
				page,
				imageSize,
				order,
			});

			if (newCats.length > 0) {
				if (currentBreedId !== breedId) {
					setCurrentBreedId(breedId);
					setCats(newCats);
				} else {
					setCats(cats.concat(newCats));
				}
				if (newCats.length < limit) {
					setEndOfPage(true);
				}
			} else {
				setEndOfPage(true);
			}
		} catch (error) {
			setErrorMessage(defaultErrorMessage);
		} finally {
			setLoading(false);
		}
	};

	const listBreeds = async () => {
		try {
			setLoading(true);
			setErrorMessage(undefined);
			setBreeds(await catApi.listBreeds());
		} catch (error) {
			setErrorMessage(defaultErrorMessage);
		} finally {
			setLoading(false);
		}
	};

	const resetCats = () => {
		setCats([]);
		setEndOfPage(false);
	};

	return (
		<CatContext.Provider
			value={{
				breeds,
				cat,
				cats,
				loading,
				errorMessage,
				endOfPage,
				getCat,
				listCats,
				listBreeds,
				resetCats,
			}}
		>
			{loading && <Loader loading={loading} />}
			{errorMessage && <Alert variant={"danger"}>{errorMessage}</Alert>}
			{children}
		</CatContext.Provider>
	);
}

function useCat() {
	return React.useContext(CatContext);
}

export default useCat;
