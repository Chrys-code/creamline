import { useLoaderData } from "react-router";
import Header from "../../layouts/Header"


const home: React.FC = () => {
	const data = useLoaderData();

	return (
		<>
			<Header />
			<main>
				<h1>Szia, {data.user.email}</h1>
				<p>Mit csinálunk ma?</p>
			</main>
		</>
	)
}

export default home