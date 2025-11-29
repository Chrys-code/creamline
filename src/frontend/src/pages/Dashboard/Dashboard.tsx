import type React from "react";
import type { DashboardProps } from "./Dashboard.types";

import { useRouteLoaderData } from "react-router";
import { useTypedTranslation } from "../../shared/hooks/useTypedTranslation/useTypedTranslation";

const Dashboard: React.FC = () => {
	const data = useRouteLoaderData<DashboardProps>("app");
	const dt = useTypedTranslation("dashboard");

	const name = `${data?.profile?.first_name} ${data?.profile?.last_name}`;
	const profileHasName = !!name.replaceAll(" ", "");
	const displayName = profileHasName ? name : data?.profile?.email;

	return (
		<>
			<div>
				<h1>
					{dt("dashboard.greet")}, {displayName}
				</h1>
				<p>{dt("dashboard.question")}</p>
			</div>
		</>
	);
};

export default Dashboard;
