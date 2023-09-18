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
	const [confirmPW, setConfirmPW] = useState("");
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	let [profilePic, setProfilePic] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [pwType, setPwType] = useState("password");
	const { closeModal } = useModal();

	useEffect(() => {
		if (username.length >= 3 && password.length >= 6 && firstName.length >= 3 && firstName.length <= 50 && lastName.length >= 3 && lastName.length <= 50 && password === confirmPW) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}

		showPassword === false ? setPwType("password") : setPwType("text");
	}, [firstName, lastName, username, password, confirmPW, showPassword]);

	const reset = () => {
		setEmail('')
		setUsername('')
		setPassword('')
		setFirstName('')
		setLastName('')
	}

	const handleShowPW = () => {
		showPassword === false ? setShowPassword(true) : setShowPassword(false);
	  };

	const handleSubmit = async (e) => {
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
			  reset();
			  closeModal();
			  history.push("/all");
		}
	};

	return (
		<div className="signup-modal">
			<p className="greet">Join Feedium.</p>
			<form onSubmit={handleSubmit} encType="multipart/form-data" className="signup-form">
				<ul>
					{Object.values(errors).length > 0 && errors.map((error, idx) => (
						<li style={{listStyleType: "none", color: "red"}} key={idx}>{error}</li>
					))}
				</ul>
				<input
					type="text"
					placeholder="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					className="signup_input_field"
				/>
				<input
					type="text"
					placeholder="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					className="signup_input_field"
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="signup_input_field"
				/>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className="signup_input_field"
				/>
				<span className="signup-pw-input">
					<input
						type={pwType}
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="signup_input_field pw"
						/>
					{showPassword === true && <span class="material-symbols-outlined signup-eye" onClick={handleShowPW}>visibility</span>}
            		{showPassword === false && <span class="material-symbols-outlined signup-eye" onClick={handleShowPW}>visibility_off</span>}
				</span>
				<input
					type={pwType}
					placeholder="Confirm Password"
					value={confirmPW}
					onChange={(e) => setConfirmPW(e.target.value)}
					required
					className="signup_input_field"
				/>
				<span className="file-span">
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
