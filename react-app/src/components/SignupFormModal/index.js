import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const graphic = "https://cdnb.artstation.com/p/assets/images/images/064/381/991/4k/krzysztof-maziarz-forestrailsmockup-final.jpg?1687803093"

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<div className="signup-modal-wrapper">
				<div className="signup-graphic">
					<img src={graphic} alt="graphic" className="signup-graphic-pic" />
				</div>

				<div className="signup-container">
					<h1 className="signup-header">Sign Up</h1>
					<h2 className="signup-h2">Start your journey today!</h2>
					<form onSubmit={handleSubmit} className="signup-form">
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
						<label>

							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Email"
							/>
						</label>
						<label>

							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								placeholder="Username"
							/>
						</label>
						<label>

							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Password"
							/>
						</label>
						<label>

							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								placeholder="Confirm Password"
							/>
						</label>
						<button type="submit" className="signup-button">Submit</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupFormModal;
