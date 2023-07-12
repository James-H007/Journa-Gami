import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const graphic = "https://cdn.dribbble.com/users/763353/screenshots/5400172/media/4b0d5dc8f004d298781b7c9f31cc33df.png?compress=1&resize=800x600&vertical=center"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <>
      <div className="signup-modal-wrapper">
        <div className="signup-graphic">
          <img src={graphic} alt="graphic" className="signup-graphic-pic" />
        </div>
        <div className="signup-container">
          <h1 className="signup-header">Log In</h1>
          <h2 className="signup-h2">Welcome back!</h2>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </label>
            <button type="submit" className="signup-button">Log In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
