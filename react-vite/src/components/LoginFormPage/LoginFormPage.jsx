import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sessionUser) {
      navigate("/home");
    }
  }, [sessionUser, navigate]);

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
      <div className="login-container">
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
        </form>
        <div className="credentials">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}


export default LoginFormPage;
