import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("./Routes/Home"));

const Cat = React.lazy(() => import("./Routes/Cat"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <div>Error: 404</div>,
	},
	{
		path: "/cats/:id",
		element: <Cat />,
		errorElement: <div>Error: 404</div>,
	},
]);

export default router;
