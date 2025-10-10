import type React from "react";
import {signup} from "../../api/auth";

const Signup: React.FC = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		//@ts-expect-error missing target elements
		signup({ email: e.target.elements[0].value, password: e.target.elements[1].value });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="email" autoComplete="true"></input>
				<input type="password" name="password"></input>
				<button type="submit">Signup!</button>
			</form>
		</div>
	);
};

export default Signup;