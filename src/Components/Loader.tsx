import Spinner from "react-bootstrap/Spinner";
import { css } from "@emotion/css";

function Loader({ loading }: { loading: boolean }) {
	return (
		<div
			className={css`
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100vh;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 999;
				display: ${loading ? "flex" : "none"};
				justify-content: center;
				align-items: center;
			`}
		>
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
}

export default Loader;
