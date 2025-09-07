import InputField from "../../components/InputField"
import { user } from "../../api/auth/user"

const home: React.FC = () => {
	const handleClick = () => {
		user()
	}

	return (
		<>
			<>HOME</>
			<button onClick={handleClick} >ME!</button>
			<hr/>
			<InputField id="1" name="email" type="text" label='Labelled:' info="Optional" error='My error text'  />
		</>
	)
}

export default home