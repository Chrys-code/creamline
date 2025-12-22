import type { RouteObject } from "react-router";
import AuthLayout from "@/shared/layouts/authLayout";
import Login from "@/pages/login/Login";

const authRoutes: RouteObject = {
	id: "login",
	path: "/login",
	element: <AuthLayout />,
	children: [
		{
			index: true,
			element: <Login />,
		},
	],
};

export default authRoutes;
