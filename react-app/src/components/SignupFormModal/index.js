import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	let [profilePic, setProfilePic] = useState(null);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		// e.preventDefault();
		// if (password === confirmPassword) {
		// 	const data = await dispatch(signUp(username, email, password));
		// 	if (data) {
		// 		setErrors(data);
		// 	} else {
		// 		closeModal();
		// 	}
		// } else {
		// 	setErrors([
		// 		"Confirm Password field must be the same as the Password field",
		// 	]);
		// }
		e.preventDefault();
		const formData = new FormData();
		formData.append("email", email);
		formData.append("username", username);
		formData.append("first_name", firstName);
		formData.append("last_name", lastName);
		if (profilePic !== null) formData.append("profile_pic", profilePic);
		formData.append("password", password);

		await dispatch(signUp(formData));
		closeModal();
		setEmail('')
		setUsername('')
		setPassword('')
		setFirstName('')
		setLastName('')
		history.push("/all");
	};

	return (
		<>
			<h2>Join Medium.</h2>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<label id='file-label'>Upload your profile picture:</label>
					<input
						className=""
						type="file"
						onChange={(e) => setProfilePic(e.target.files[0])}
						accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
					/>
				<button type="submit">Sign Up</button>
			</form>
			<span style={{display: "flex", flexDirection: "row"}}>
				<p>Already have an account?</p>
				<OpenModalButton
					className = "modal_btn"
					buttonText="Sign In"
					modalComponent={<LoginFormModal />}
					style={{border: "none", backgroundColor: "transparent", fontSize: "16px", color: "rgb(26, 137, 23)", fontWeight: "bold"}}
				/>
			</span>
		</>
	);
}

export default SignupFormModal;
