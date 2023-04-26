import { css } from "@emotion/css";
import React from "react";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useParams } from "react-router-dom";
import useCat from "../Utils/CatProvider";

function Cat() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { getCat, cat } = useCat();

	const onBack = () => {
		if (cat) {
			navigate(`/?breed_id=${cat.breeds[0].id}`);
		} else {
			navigate("/");
		}
	};

	React.useEffect(() => {
		if (id) {
			getCat({ id, imageSize: "med" });
		}
	}, [id]);

	return (
		<Stack className="col-md-6 mx-auto my-5">
			{/* <Link to="/" className="mb-2">
				<Button>Back</Button>
			</Link> */}
			<Button className="col-sm-2 mb-2" onClick={onBack}>
				Back
			</Button>
			{cat && (
				<Stack
					className={css`
						display: flex;
						align-items: center;
						text-align: center;
					`}
				>
					<div
						className={css`
							width: 50%;
						`}
					>
						<Image src={cat.url} rounded fluid />
					</div>
					<h1>{cat.breeds[0].name}</h1>
					<h5>{cat.breeds[0].origin}</h5>
					<h6>{cat.breeds[0].temperament}</h6>
					<p>{cat.breeds[0].description}</p>
				</Stack>
			)}
		</Stack>
	);
}

export default React.memo(Cat);
