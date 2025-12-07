import "../src/styles/globals.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import appRouter from "./routes/router";
import { ToastContainer } from "react-toastify";

import "./configs/i18n";
import { toastConfig } from "./configs/ToastConfig";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ToastContainer {...toastConfig} />
		<RouterProvider router={appRouter} />
	</StrictMode>
);
