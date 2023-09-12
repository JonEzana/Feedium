import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [borderStyle, setBorderStyle] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const { closeModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    if (password.length >= 6) setDisabled(false);
    else setDisabled(true);
    // showPassword === false ? setPwType("password") : setPwType("text");
  }, [password])

  const borderColor = () => {
    if (borderStyle) return {border: "1px solid red"};
    return {border: "none"}
  }

  const LoginTheDemoUserFunction = () => {
    const email = 'demo@aa.io';
    const password = 'password';
    return dispatch(login(email, password))
      .then(() => closeModal())
      .then (() => history.push('/all'))
      .catch(async (res) => {
        const data = await res.json();
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/all")
    }
  };

  return (
    <div className="modal login">
      <p className="greeting">Welcome back.</p>
      <form onSubmit={handleSubmit} className="login_form">
        <ul>
          {errors.map((error, idx) => (
            <li style={{listStyleType: "none", color: "red"}} key={idx}>{error}</li>
          ))}
        </ul>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          // style={borderColor()}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn" disabled={disabled}>Log In</button>
      </form>
      <span style={{display: "flex", flexDirection: "row"}}>
        <p>No account?</p>
        <OpenModalButton
					className = "modal_btn"
					buttonText="Create one"
					modalComponent={<SignupFormModal />}
					style={{border: "none", backgroundColor: "transparent", fontSize: "16px", color: "rgb(26, 137, 23)", fontWeight: "bold"}}
				/>
      </span>
      <p className="or">or</p>
      <button className="demo-btn" onClick={LoginTheDemoUserFunction}>Demo Login</button>
    </div>
  );
}

export default LoginFormModal;
