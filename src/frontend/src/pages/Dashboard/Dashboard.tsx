import { useNavigate, useRouteLoaderData } from "react-router";

import type { AppLoaderData } from "../../lib/types/AppLoaderData";
import styles from "./Dashboard.module.scss";

import Button from "../../components/Button";

const Dashboard: React.FC = () => {
	const data = useRouteLoaderData('app') as AppLoaderData;
	const navigate = useNavigate();

	return (
		<>
			<div>
				<h1>Szia, {data.user.email}</h1>
				<p>Mit csinálunk ma?</p>
			</div>

			<section className={styles.tasks}>
				<h2>Feladatok:</h2>
				<div>
					<Button style="secondary" type="button" onClick={() => navigate("/milk-collection")}>Tejátvétel</Button>
					<Button style="secondary" type="button">Pasztőr</Button>
				</div>
			</section>
		</>
	)
}

export default Dashboard