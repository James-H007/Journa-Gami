import React, { useEffect, useRef, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import idle from "../../assets/ungaidle.gif"

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };



    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else {
      history.push("/journals")
    }

  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
      // console.log(data)
    }
    else {
      history.push("/journals")
    }

  }

  return (
    <>
      { }
      <div className="login-page-wrapper">

        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-header">Log In</h1>
          <div className="login-graphic">
            <img src={idle} alt="pet" />
            <img src={idle} alt="pet" />
            <img src={idle} alt="pet" />

          </div>

          <ul>
            {/* {Object.values(errors).map((error, idx) => (
              <li key={idx} className="error">{error}</li>
            ))} */}
            {Object.values(errors).length > 0 && (
              <div className="error">Incorrect email or password</div>
            )}
          </ul>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-form-input"
          />


          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-form-input"
          />

          <button type="submit" className="signup-button">Log In</button>
          <div className="demo-login" onClick={demoLogin}> Demo Login</div>
          <div>
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        </form>

      </div>
    </>
  );
}

export default LoginFormPage;
