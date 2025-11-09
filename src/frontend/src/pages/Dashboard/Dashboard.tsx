import type React from "react";
import type { DashboardProps } from "./Dashboard.types";
import styles from "./Dashboard.module.scss";

import Button from "../../components/button";

import { useNavigate, useRouteLoaderData } from "react-router";
import { useTypedTranslation } from "../../lib/hooks/useTypedTranslation/useTypedTranslation";

const Dashboard: React.FC = () => {
	const data = useRouteLoaderData<DashboardProps>("app");
	const navigate = useNavigate();
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

			<section className={styles.tasks}>
				<h2>{dt("dashboard.tasks")}</h2>
				<div>
					<Button style="secondary" type="button" onClick={() => navigate("/users")}>
						{"User management"}
					</Button>
					<Button
						style="secondary"
						type="button"
						onClick={() => navigate("/milk-collection")}
					>
						{dt("dashboard.task_milk_collection")}
					</Button>
					<Button
						style="secondary"
						type="button"
						onClick={() => navigate("/pasteurised-milk")}
					>
						{dt("dashboard.task_pasteur")}
					</Button>
				</div>
			</section>
		</>
	);
};

export default Dashboard;
