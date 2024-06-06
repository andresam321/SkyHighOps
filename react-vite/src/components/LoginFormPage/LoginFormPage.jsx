import { useState, useEffect, useRef } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const user = useSelector((store) => store.session.user);
  console.log("line 14 user", user);
  const ulRef = useRef();

  useEffect(() => {
    if (sessionUser) {
      navigate("/home");
    }
  }, [sessionUser, navigate]);

  useEffect(() => {
    if (!showSignupModal) return;
  }, [showSignupModal]); // <- Missing closing curly brace here

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowSignupModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, setShowSignupModal]);

  const closeMenu = () => setShowMenu(false);

  const handleDemoUserLogin = async () => {
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";

    const serverResponse = await dispatch(
      thunkLogin({
        email: demoEmail,
        password: demoPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/home");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/home");
    }
  };
  useEffect(() => {
    const errorsObj = {};

    if (!email || email.length < 7) {
      errorsObj.email = "Email is required and must be more than 7 characters";
    }
    if (!password || password.length < 8) {
      errorsObj.password = "Password must be 8 or more characters";
    }

    setErrors(errorsObj);
  }, [email, password]);

  return (
    <div className="login-page">
      <div className={`login-container ${showSignupModal ? "blur-background" : ""}`}>
        <div className="login-forms">
          <div className="login-form">
            <h1>Employee Login</h1>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-control">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                {errors.email && <span className="form-errors-login">{errors.email}</span>}
              </div>
              <div className="form-control">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                {errors.password && <span className="form-errors-login">{errors.password}</span>}
              </div>
              <button disabled={Object.values(errors).length > 0} className="btn login-btn-main" type="submit">
                Log In
              </button>
            <button
                type="button"
                className="btn demo-btn"
                onClick={handleDemoUserLogin}
                >
              Login as Demo User
            </button>
              <button
                type="button"
                className="btn signup-btn"
                onClick={() => setShowSignupModal(true)}
              >
                Sign Up
              </button>
            </form>
          </div>
          {showSignupModal && (
            <div className="signup-form">
              <SignupFormModal />
            </div>
          )}
        </div>
        <div className="credentials">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}


export default LoginFormPage;