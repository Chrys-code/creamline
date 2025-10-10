import type React from "react";
import styles from "./Dashboard.module.scss";

import Button from "../../components/Button";
import type { RootLoaderData } from "../../routes/loaders/types";

import { useNavigate, useRouteLoaderData } from "react-router";

const Dashboard: React.FC = () => {
	const data = useRouteLoaderData("app") as RootLoaderData;
	const navigate = useNavigate();

	const name = `${data.profile.first_name} ${data.profile.last_name}`;
	const profileHasName = !!name.replaceAll(" ", "");
	const displayName = profileHasName ? name : data.profile.email;

	return (
		<>
			<div>
				<h1>Szia, {displayName}</h1>
				<p>Mit csinálunk ma?</p>
			</div>

			<section className={styles.tasks}>
				<h2>Feladatok:</h2>
				<div>
					<Button
						style="secondary"
						type="button"
						onClick={() => navigate("/milk-collection")}
					>
						Tejátvétel
					</Button>
					<Button style="secondary" type="button" onClick={() => navigate("/pasteur")}>
						Pasztőr
					</Button>
				</div>
			</section>
		</>
	);
};

export default Dashboard;
