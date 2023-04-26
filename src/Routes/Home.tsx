import { css } from "@emotion/css";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { Link, useSearchParams } from "react-router-dom";
import useCat from "../Utils/CatProvider";

function Home() {
	let [searchParams, setSearchParams] = useSearchParams();
	const [selectedBreedId, setSelectedBreedId] = React.useState<
		string | undefined
	>();

	const { breeds, cats, endOfPage, listBreeds, listCats, resetCats } = useCat();

	const limit = 5;
	const [page, setPage] = React.useState<number>(
		Math.max(Math.floor(cats.length / limit) - 1, 0)
	);

	React.useEffect(() => {
		const breedId = searchParams.get("breed_id");
		if (breedId) {
			setSelectedBreedId(breedId);
		}
	}, [searchParams]);

	React.useEffect(() => {
		listBreeds();
	}, []);

	React.useEffect(() => {
		if (selectedBreedId) {
			listCats({
				breedId: selectedBreedId,
				imageSize: "small",
				order: "DESC",
				page,
				limit,
			});
		}
	}, [selectedBreedId, page]);

	const onChange: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
		setSelectedBreedId(evt.target.value);
		setSearchParams({ breed_id: evt.target.value });
		resetCats();
		setPage(0);
	};

	const onLoadMore: React.MouseEventHandler<HTMLButtonElement> = async () => {
		setPage(page + 1);
	};

	return (
		<>
			<Stack className="col-md-6 mx-auto my-5">
				<h1>Images of Cats</h1>
				{breeds && breeds.length > 0 && (
					<>
						<Form.Select value={selectedBreedId} onChange={onChange}>
							<option>-- Select a Cat Breed --</option>
							{breeds.map((breed) => {
								return (
									<option key={breed.id} value={breed.id}>
										{breed.name}
									</option>
								);
							})}
						</Form.Select>
						{cats && cats.length > 0 && (
							<>
								<div
									className={css`
										display: flex;
										flex-wrap: wrap;
										margin-top: 1rem;
										gap: 1rem;
										align-items: flex-end;
										justify-content: center;
									`}
								>
									{cats.map((cat) => {
										return (
											<div
												key={cat.id}
												className={css`
													width: 45%;
													text-align: center;
												`}
											>
												<Image src={cat.url} rounded fluid />
												<Link to={`cats/${cat.id}`}>
													<Button variant="info" style={{ width: "100%" }}>
														View details
													</Button>
												</Link>
											</div>
										);
									})}
								</div>
								{!endOfPage && (
									<Button className="my-4" onClick={onLoadMore}>
										Load More
									</Button>
								)}
							</>
						)}
					</>
				)}
			</Stack>
		</>
	);
}

export default React.memo(Home);
