import { user } from "../../api/auth/user"

const home: React.FC = () => {
	const handleClick = () => {
		user()
	}

	return (
		<>
			<>HOME</>
			<button onClick={handleClick} >ME!</button>
		</>
	)
}

export default home