import { login } from "../../api/auth/login"

const Login: React.FC = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		console.log(e)
		// @ts-ignore
		login({ email: e.target.elements[0].value, password: e.target.elements[1].value })
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="email" autoComplete="true"></input>
				<input type="password" name="password"></input>
				<button type="submit">Login!</button>
			</form>
		</div>
	)
}

export default Login