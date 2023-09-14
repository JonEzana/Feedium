import React, { useState, useEffect } from "react";
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
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	let [profilePic, setProfilePic] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const { closeModal } = useModal();

	useEffect(() => {
		// const errObj = {};
		// if (username.length > 0 && username.length < 4) errObj.username = "Username must be at least 4 characters long";
		// if (password.length > 0 && password.length < 6) errObj.password = "Password must be at least 6 characters long";
		// if (firstName.length > 0 && (firstName.length < 3 || firstName.length > 50)) errObj.firstName = "First name must be between 3 and 50 characters";
		// if (lastName.length > 0 && (lastName.length < 3 || lastName.length > 50)) errObj.lastName = "Last name must be between 3 and 50 characters";
		// if (password.length > 0 && password.length < 6) errObj.confirmPassword = "Password must be at least 6 characters";

		if (username.length >= 3 && password.length >= 6 && firstName.length >= 3 && firstName.length <= 50 && lastName.length >= 3 && lastName.length <= 50) {
			setDisabled(false);
		} else setDisabled(true)

		// showPassword === false ? setPwType("password") : setPwType("text");

		// setErrors(errObj);
	}, [firstName, lastName, username, password]);

	const reset = () => {
		setEmail('')
		setUsername('')
		setPassword('')
		setFirstName('')
		setLastName('')
	}

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

		const data = await dispatch(signUp(formData));
		if (data) {
			setErrors(data);
			reset()
		  } else {
			  closeModal();
			  reset()
			  history.push("/all");
		}
	};

	return (
		<div className="signup-modal">
			<h2 className="greet">Join Feedium.</h2>
			<form onSubmit={handleSubmit} encType="multipart/form-data" className="signup-form">
				<ul>
					{errors.map((error, idx) => (
						<li style={{listStyleType: "none", color: "red"}} key={idx}>{error}</li>
					))}
				</ul>
				<input
					type="text"
					placeholder="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					className="input_field"
				/>
				<input
					type="text"
					placeholder="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					className="input_field"
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="input_field"
				/>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className="input_field"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="input_field"
				/>
				<span className="file-span">
					{/* <label id='file-label'>Upload your profile picture (optional):</label> */}
					<label className='upload-btn-label' for="file-upload">Upload your profile picture (optional):<i className="fas fa-upload"></i></label>
						<input
							id="file-upload"
							className="pic-field"
							type="file"
							onChange={(e) => setProfilePic(e.target.files[0])}
							accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
							hidden
							/>
				</span>
				<button type="submit" className="signup-button" disabled={disabled}>Sign Up</button>
			</form>
			<span style={{display: "flex", flexDirection: "row"}}>
				<p>Already have an account?</p>
				<OpenModalButton
					className = "modal_btn"
					buttonText="Sign in"
					modalComponent={<LoginFormModal />}
					style={{border: "none", backgroundColor: "transparent", fontSize: "16px", color: "rgb(26, 137, 23)", fontWeight: "bold"}}
				/>
			</span>
		</div>
	);
}

export default SignupFormModal;
