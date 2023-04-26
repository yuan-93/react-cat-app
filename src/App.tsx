import React from "react";
import { RouterProvider } from "react-router-dom";
// import "./App.css";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { CatProvider } from "./Utils/CatProvider";

function App() {
	return (
		<React.Suspense fallback={<p>Loading...</p>}>
			<CatProvider>
				<RouterProvider router={router} />
			</CatProvider>
		</React.Suspense>
	);
}

export default App;
